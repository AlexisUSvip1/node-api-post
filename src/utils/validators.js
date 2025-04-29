import { User } from "../models/users-models/user.schema.js";
import { Post } from "../models/post-models/post.schema.js";

// Validación para verificar si el usuario existe
export const validateUserExists = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
};

// Validación para verificar si el post existe
export const validatePostExists = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
};

// Validación para verificar que todos los campos requeridos en la creación de un post están presentes
export const validatePostCreationFields = (title, body, user_id, tags) => {
  if (!title || !body || !user_id || !tags) {
    throw new Error("Faltan campos requeridos");
  }
};

// Validación para verificar que el `user_id` está presente en las operaciones de like y save
export const validateUserId = (user_id) => {
  if (!user_id) {
    throw new Error("User ID is required");
  }
};

// Validación para la existencia del "like" de un post
export const validateLikeExistence = async (postId, userId) => {
  const existingLike = await Like.findOne({ postId, userId });
  if (existingLike) {
    throw new Error("Like already exists");
  }
};

// Validación para verificar si un "like" o "save" se puede eliminar
export const validateLikeOrSaveDeletion = async (postId, userId) => {
  const like = await Like.findOne({ postId, userId });
  const savePost = await Save.findOne({ postId, userId });

  if (!like && !savePost) {
    throw new Error("No like or save found to delete");
  }
};
