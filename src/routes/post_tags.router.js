import express from "express";
import { PostTag } from "../models/postTag.schema";
const router = express.Router();

router.post("/add-post-tag", async (req, res) => {
  try {
    const { post_id, tag_id } = req.body;

    if (!post_id || !tag_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Crear nueva relación entre post y tag
    const newPostTag = new PostTag({
      post_id,
      tag_id,
    });

    // Guardar en la base de datos
    const savedPostTag = await newPostTag.save();

    res.status(201).json(savedPostTag);
  } catch (error) {
    console.error("Error al agregar el tag al post:", error);
    res.status(500).json({ message: "Error al agregar el tag al post", error });
  }
});

router.get("/get-post-tags", async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({ message: "Se requiere post_id" });
    }

    // Buscar tags asociados a un post
    const postTags = await PostTag.find({ post_id }).populate("tag_id");

    res.status(200).json(postTags);
  } catch (error) {
    console.error("Error al obtener los tags del post:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los tags del post", error });
  }
});

export default router;
