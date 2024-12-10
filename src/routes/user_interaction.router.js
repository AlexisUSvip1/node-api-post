import express from "express";
import { UserInteractionHistory } from "../models/userInteractionHistory";
const router = express.Router();

// Ruta para obtener las interacciones de un usuario, una publicación, un comentario o tipo de interacción
router.get("/get-interactions", async (req, res) => {
  try {
    const { user_id, post_id, comment_id, interaction_type } = req.query;

    // Validación: al menos uno de los parámetros user_id, post_id o comment_id debe ser proporcionado
    if (!user_id && !post_id && !comment_id && !interaction_type) {
      return res.status(400).json({
        message: "Se requiere user_id, post_id, comment_id o interaction_type",
      });
    }

    // Construir la consulta de búsqueda
    let query = {};
    if (user_id) query.user_id = user_id;
    if (post_id) query.post_id = post_id;
    if (comment_id) query.comment_id = comment_id;
    if (interaction_type) query.interaction_type = interaction_type;

    const interactions = await UserInteractionHistory.find(query);

    // Si no se encuentran interacciones, devuelve un mensaje apropiado
    if (interactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron interacciones" });
    }

    // Responde con las interacciones encontradas
    res.status(200).json(interactions);
  } catch (error) {
    console.error("Error al obtener las interacciones:", error);
    res
      .status(500)
      .json({ message: "Error al obtener las interacciones", error });
  }
});

// Ruta para agregar una interacción de usuario (like o comment)
router.post("/add-interaction-history", async (req, res) => {
  try {
    const { user_id, post_id, interaction_type } = req.body;

    // Validación básica de campos obligatorios
    if (!user_id || !post_id || !interaction_type) {
      return res.status(400).json({
        message: "user_id, post_id y interaction_type son obligatorios.",
      });
    }

    // Validar que el tipo de interacción sea "like" o "comment"
    if (!["like", "comment"].includes(interaction_type)) {
      return res
        .status(400)
        .json({ message: "interaction_type debe ser 'like' o 'comment'." });
    }

    // Crea un nuevo documento de interacción
    const newInteraction = new UserInteractionHistory({
      user_id,
      post_id,
      interaction_type,
      comment_id: null,
    });

    // Guarda la nueva interacción en la base de datos
    const savedInteraction = await newInteraction.save();

    // Responde con la interacción guardada
    res.status(201).json(savedInteraction);
  } catch (error) {
    console.error("Error al agregar la interacción:", error);
    res.status(500).json({ message: "Error al agregar la interacción", error });
  }
});

export default router;
