// src/controllers/savedPost.controller.js
import { SavedPost } from "../models/savedPost.schema.js";

export const savePost = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    if (!user_id || !post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const newSavedPost = new SavedPost({ user_id, post_id });
    const savedPost = await newSavedPost.save();

    return res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error al guardar el post:", error);
    return res.status(500).json({ message: "Error al guardar el post", error });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "Se requiere user_id" });
    }

    const savedPosts = await SavedPost.find({ user_id }).populate("post_id");
    return res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Error al obtener los posts guardados:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los posts guardados", error });
  }
};
