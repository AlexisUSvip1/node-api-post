// src/controllers/postTag.controller.js
import { PostTag } from "../models/postTag.schema.js";

export const addPostTag = async (req, res) => {
  try {
    const { post_id, tag_id } = req.body;

    if (!post_id || !tag_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const newPostTag = new PostTag({ post_id, tag_id });
    const savedPostTag = await newPostTag.save();

    return res.status(201).json(savedPostTag);
  } catch (error) {
    console.error("Error al agregar el tag al post:", error);
    return res
      .status(500)
      .json({ message: "Error al agregar el tag al post", error });
  }
};

export const getPostTags = async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const postTags = await PostTag.find({ post_id }).populate("tag_id");
    return res.status(200).json(postTags);
  } catch (error) {
    console.error("Error al obtener los tags del post:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los tags del post", error });
  }
};
