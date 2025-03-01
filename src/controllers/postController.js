// src/controllers/post.controller.js
import { Post } from '../models/post.schema.js';
import { User } from '../models/user.schema.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts', error });
  }
};
export const createPost = async (req, res) => {
  try {
    const { title, body, user_id, tags } = req.body;
    console.log(tags);
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!title || !body || !user_id || !tags) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const media =
      req.files?.map((file) => ({
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith('image/')
          ? 'image'
          : file.mimetype.startsWith('video/')
          ? 'video'
          : 'audio',
      })) || [];
    const newPost = new Post({
      title,
      body,
      user_id,
      media,
      tags,
      user_avatar: user.avatar_url,
      usernameUser: user.display_name,
    });

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error al insertar el post:', error);
    return res.status(500).json({ message: 'Error inserting post', error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Solo se actualizarán los campos enviados

    // Buscamos y actualizamos el post sin afectar otros campos
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error });
  }
};
