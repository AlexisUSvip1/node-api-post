// src/controllers/comment.controller.js

import { Comment } from "../models/comment.schema.js";

export const createComment = async (req, res) => {
  try {
    const { body, user_id, post_id } = req.body;

    // Validar campos requeridos
    if (!body || !user_id || !post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Crear un nuevo comentario
    const newComment = new Comment({
      body,
      user_id,
      post_id,
    });

    // Guardar el comentario
    const savedComment = await newComment.save();

    // Responder con el comentario guardado
    return res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error al insertar el comentario:", error);
    return res
      .status(500)
      .json({ message: "Error al insertar el comentario", error });
  }
};

export const getComments = async (req, res) => {
  try {
    const { post_id, user_id } = req.query;

    // Verificar que al menos uno de los parámetros esté presente
    if (!post_id && !user_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Construir la consulta de búsqueda
    const query = {};
    if (post_id) query.post_id = post_id;
    if (user_id) query.user_id = user_id;

    // Obtener los comentarios con populates opcionales
    const comments = await Comment.find(query)
      .populate("user_id", "display_name email")
      .populate("post_id", "title")
      .exec();

    // Responder con los comentarios encontrados
    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};
