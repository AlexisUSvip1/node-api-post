import { Comment } from "../../models/comment-models/comment.schema.js";
import { User } from "../../models/users-models/user.schema.js";

export const createComment = async (req, res) => {
  try {
    const { body, user_id, post_id, userName, user_avatar } = req.body;

    if (!body || !user_id || !post_id || !userName || !user_avatar) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const user = await User.findById(user_id);
    const newComment = new Comment({
      body,
      user_avatar: user.avatar_url,
      userName: user.display_name,
      user_id,
      post_id,
    });

    // Guardar el comentario
    const savedComment = await newComment.save();

    return res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error al insertar el comentario:", error);
    return res
      .status(500)
      .json({ message: "Error al insertar el comentario", error });
  }
};
export const getCommentsById = async (req, res) => {
  console.log(req, res);
  try {
    const { id } = req.params;

    // Validate the required parameter
    if (!id) {
      return res.status(400).json({ message: "Falta el post_id requerido" });
    }

    // Fetch comments for a specific post_id
    const comments = await Comment.find({ post_id: id });

    // If no comments found
    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron comentarios para este post" });
    }

    // Return the comments
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios por ID:", error);
    return res.status(500).json({
      message: "Error interno del servidor al obtener comentarios",
      error,
    });
  }
};
