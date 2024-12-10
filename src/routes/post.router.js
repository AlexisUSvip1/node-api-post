import express from "express";
const router = express.Router();
import { Post } from "../models/post.schema.js"; // Verifica la ruta

router.get("/post-dev-get", async (req, res) => {
  try {
    // Obtiene todos los posts de la base de datos
    const posts = await Post.find();

    // Responde con los posts obtenidos
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

router.post("/post-dev", async (req, res) => {
  try {
    const { title, body, user_id, type_id, status, background } = req.body;

    if (!title || !body || !user_id || !type_id || !status || !background) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    // Crea un nuevo documento basado en el modelo
    const newPost = new Post({
      title,
      body,
      user_id,
      type_id,
      status,
      background,
    });

    // Guarda el documento en MongoDB
    const savedPost = await newPost.save();

    // Responde con el post guardado
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error inserting post:", error);
    res.status(500).json({ message: "Error inserting post", error });
  }
});
export default router;
