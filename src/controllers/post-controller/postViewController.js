// src/controllers/postView.controller.js
import { PostView } from "../models/postView.schema.js";

export const viewPost = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    if (!user_id || !post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const newPostView = new PostView({ user_id, post_id });
    const savedPostView = await newPostView.save();

    return res.status(201).json(savedPostView);
  } catch (error) {
    console.error("Error al registrar la vista del post:", error);
    return res
      .status(500)
      .json({ message: "Error al registrar la vista del post", error });
  }
};

export const getPostViews = async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const postViews = await PostView.find({ post_id }).populate("user_id");
    return res.status(200).json(postViews);
  } catch (error) {
    console.error("Error al obtener las vistas del post:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener las vistas del post", error });
  }
};
