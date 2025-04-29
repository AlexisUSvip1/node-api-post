import { Post, Like, Save } from "../models/post.schema.js";
import { User } from "../models/user.schema.js";
import {
  validateUserId,
  validatePostExists,
  validateLikeExistence,
  validateUserExists,
} from "../utils/validators.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().lean();

    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await Like.countDocuments({
          postId: post._id,
          like: true,
        });
        const savePost = await Save.findOne({
          postId: post._id,
          userId: post.user_id,
        });
        return {
          ...post,
          total_likes: likesCount,
          savePost: savePost ? savePost.savePost : false,
        };
      })
    );

    return res.status(200).json(postsWithLikes);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, body, user_id, tags } = req.body;

    // Validar que el usuario exista
    await validateUserExists(user_id);

    // Validar que los campos requeridos estén presentes
    validatePostCreationFields(title, body, user_id, tags);

    const user = await User.findById(user_id);

    const media =
      req.files?.map((file) => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith("image/")
          ? "image"
          : file.mimetype.startsWith("video/")
          ? "video"
          : "audio",
      })) || [];

    const newPost = new Post({
      title,
      body,
      user_id,
      media,
      tags,
      user_avatar: user.avatar_url,
      usernameUser: user.display_name,
    });

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error al insertar el post:", error);
    return res.status(500).json({ message: "Error inserting post", error });
  }
};
export const updateSavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Validar que el user_id esté presente
    validateUserId(user_id);

    // Validar que el post exista
    await validatePostExists(id);

    // Validar que el "like" o "save" pueda ser eliminado
    await validateLikeOrSaveDeletion(id, user_id);

    const existSavepost = await Save.findOne({ postId: id, userId: user_id });

    if (existSavepost) {
      await Save.deleteOne({ _id: existSavepost._id });
      res.json({ message: "Post unsaved" });
    } else {
      await new Save({
        postId: id,
        userId: user_id,
        savePost: true,
      }).save();
      res.json({ message: "Post saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating post save", error });
  }
};
export const updatePostLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Validar que el user_id esté presente
    validateUserId(user_id);

    // Validar que el post exista
    await validatePostExists(id);

    // Validar si el like ya existe
    await validateLikeExistence(id, user_id);

    const existingLike = await Like.findOne({ postId: id, userId: user_id });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
    } else {
      await new Like({ postId: id, userId: user_id, like: true }).save();
    }

    const likesCount = await Like.countDocuments({ postId: id, like: true });
    const post = await Post.findById(id);
    post.total_likes = likesCount;
    await post.save();

    res.json({ total_likes: likesCount });
  } catch (error) {
    res.status(500).json({ message: "Error updating post like", error });
  }
};
export const checkUserSaved = async (req, res) => {
  try {
    const { userId } = req.params;

    const savedPosts = await Save.find({ userId, savePost: true }).populate(
      "postId"
    );

    const posts = savedPosts.map((save) => ({
      ...save.postId._doc,
    }));

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ message: "Error fetching saved posts", error });
  }
};

export const checkUserLike = async (req, res) => {
  try {
    const { idPost, idUser } = req.params;

    // Validar que el user_id esté presente
    validateUserId(idUser);

    // Validar que el post exista
    await validatePostExists(idPost);

    const like = await Like.findOne({ postId: idPost, userId: idUser });
    res.status(200).json({ liked: !!like });
  } catch (error) {
    console.error("Error verificando like:", error);
    res.status(500).json({ message: "Error verificando like", error });
  }
};
