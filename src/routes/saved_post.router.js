import express from "express";
import { SavedPost } from "../models/savedPost.schema";
const router = express.Router();

router.post("/save-post", async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    // Validar que se proporcionaron los campos necesarios
    if (!user_id || !post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Crear un nuevo post guardado
    const newSavedPost = new SavedPost({
      user_id,
      post_id,
    });

    // Guardar en la base de datos
    const savedPost = await newSavedPost.save();

    // Responder con el post guardado
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error al guardar el post:", error);
    res.status(500).json({ message: "Error al guardar el post", error });
  }
});

router.get("/get-saved-posts", async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "Se requiere user_id" });
    }

    // Buscar posts guardados por usuario
    const savedPosts = await SavedPost.find({ user_id }).populate("post_id");

    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Error al obtener los posts guardados:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los posts guardados", error });
  }
});

export default router;
