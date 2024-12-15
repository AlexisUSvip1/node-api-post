// src/controllers/post.controller.js
import { Post } from "../models/post.schema.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Error fetching posts", error });
  }
};
export const createPost = async (req, res) => {
  try {
    const { title, body, user_id, type_id, status, background } = req.body;

    if (!title || !body || !user_id || !type_id || !status || !background) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Procesar archivos subidos
    const media = req.files.map((file) => ({
      url: `/uploads/${file.filename}`, // Ruta del archivo
      type: file.mimetype.startsWith("image/")
        ? "image"
        : file.mimetype.startsWith("video/")
        ? "video"
        : "audio",
    }));

    const newPost = new Post({
      title,
      body,
      user_id,
      type_id,
      status,
      background,
      media, // Agrega los archivos al post
    });

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error inserting post:", error);
    return res.status(500).json({ message: "Error inserting post", error });
  }
};
