import { Post, Like, Save } from '../models/post.schema.js';
import { User } from '../models/user.schema.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().lean();

    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await Like.countDocuments({ postId: post._id, like: true });
        const saveCount = await Save.countDocuments({ postId: post._id, savedPost: true });
        return { ...post, total_likes: likesCount, total_saves: saveCount };
      })
    );

    return res.status(200).json(postsWithLikes);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts', error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, body, user_id, tags } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!title || !body || !user_id || !tags) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const media =
      req.files?.map((file) => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith('image/')
          ? 'image'
          : file.mimetype.startsWith('video/')
          ? 'video'
          : 'audio',
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
    console.error('Error al insertar el post:', error);
    return res.status(500).json({ message: 'Error inserting post', error });
  }
};

export const updatePostLike = async (req, res) => {
  console.log('ID recibido:', req.params.id);
  console.log('User ID recibido:', req.body.user_id);

  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = await Like.findOne({ postId: id, userId: user_id });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
    } else {
      await new Like({ postId: id, userId: user_id, like: true }).save();
    }

    const likesCount = await Like.countDocuments({ postId: id, like: true });
    post.total_likes = likesCount;
    await post.save();

    res.json({ total_likes: likesCount });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post like', error });
  }
};

export const checkUserLike = async (req, res) => {
  try {
    const { idPost, idUser } = req.params;
    const like = await Like.findOne({ postId: idPost, userId: idUser });
    res.status(200).json({ liked: !!like });
  } catch (error) {
    console.error('Error verificando like:', error);
    res.status(500).json({ message: 'Error verificando like', error });
  }
};
