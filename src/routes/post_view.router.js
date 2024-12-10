import express from "express";
import { PostView } from "../models/postView.schema";
const router = express.Router();

router.post("/view-post", async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    if (!user_id || !post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Crear un nuevo registro de vista
    const newPostView = new PostView({
      user_id,
      post_id,
    });

    // Guardar en la base de datos
    const savedPostView = await newPostView.save();

    res.status(201).json(savedPostView);
  } catch (error) {
    console.error("Error al registrar la vista del post:", error);
    res
      .status(500)
      .json({ message: "Error al registrar la vista del post", error });
  }
});

router.get("/get-post-views", async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({ message: "Se requiere post_id" });
    }

    // Buscar vistas de un post específico
    const postViews = await PostView.find({ post_id }).populate("user_id");

    res.status(200).json(postViews);
  } catch (error) {
    console.error("Error al obtener las vistas del post:", error);
    res
      .status(500)
      .json({ message: "Error al obtener las vistas del post", error });
  }
});

export default router;
