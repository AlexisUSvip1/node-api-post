import express from "express";
import { Comment } from "../models/comment.schema";
const router = express.Router();

router.post("/post-comment", async (req, res) => {
  try {
    const { body, user_id, post_id } = req.body;

    // Validar que se proporcionaron los campos necesarios
    if (!body || !user_id || !post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Crear un nuevo comentario
    const newComment = new Comment({
      body,
      user_id,
      post_id,
    });

    // Guardar el comentario en la base de datos
    const savedComment = await newComment.save();

    // Responder con el comentario guardado
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error al insertar el comentario:", error);
    res.status(500).json({ message: "Error al insertar el comentario", error });
  }
});

router.get("/get-comments", async (req, res) => {
  try {
    const { post_id, user_id } = req.query;

    // Verificar que al menos uno de los parámetros (post_id o user_id) esté presente
    if (!post_id && !user_id) {
      return res.status(400).json({ message: "Se requiere post_id o user_id" });
    }

    // Construir la consulta de búsqueda
    let query = {};
    if (post_id) query.post_id = post_id;
    if (user_id) query.user_id = user_id;

    // Obtener los comentarios
    const comments = await Comment.find(query)
      .populate("user_id", "display_name email") // Opcional: agregar datos del usuario (solo nombre y email)
      .populate("post_id", "title") // Opcional: agregar datos del post (solo el título)
      .exec();

    // Responder con los comentarios encontrados
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
});

export default router;
