// src/controllers/userInteractionHistory.controller.js
import { UserInteractionHistory } from "../models/user_interaction_history.schema.js";

export const getInteractions = async (req, res) => {
  try {
    const { user_id, post_id, comment_id, interaction_type } = req.query;

    if (!user_id && !post_id && !comment_id && !interaction_type) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
      });
    }

    const query = {};
    if (user_id) query.user_id = user_id;
    if (post_id) query.post_id = post_id;
    if (comment_id) query.comment_id = comment_id;
    if (interaction_type) query.interaction_type = interaction_type;

    const interactions = await UserInteractionHistory.find(query);

    if (interactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron interacciones" });
    }

    return res.status(200).json(interactions);
  } catch (error) {
    console.error("Error al obtener las interacciones:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener las interacciones", error });
  }
};

export const addInteractionHistory = async (req, res) => {
  try {
    const { user_id, post_id, interaction_type } = req.body;

    if (!user_id || !post_id || !interaction_type) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    if (!["like", "comment"].includes(interaction_type)) {
      return res
        .status(400)
        .json({ message: "interaction_type debe ser 'like' o 'comment'." });
    }

    const newInteraction = new UserInteractionHistory({
      user_id,
      post_id,
      interaction_type,
      comment_id: null,
    });

    const savedInteraction = await newInteraction.save();
    return res.status(201).json(savedInteraction);
  } catch (error) {
    console.error("Error al agregar la interacción:", error);
    return res
      .status(500)
      .json({ message: "Error al agregar la interacción", error });
  }
};
