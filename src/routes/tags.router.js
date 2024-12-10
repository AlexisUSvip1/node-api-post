import express from "express";
import { Tag } from "../models/tags.schema.js";

const router = express.Router();

// Obtener todas las etiquetas
router.get("/get-tags", async (req, res) => {
  try {
    const tags = await Tag.find(); // Obtiene todas las etiquetas
    res.status(200).json(tags); // Responde con las etiquetas
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ message: "Error fetching tags", error });
  }
});

// Crear una nueva etiqueta
router.post("/post-tags", async (req, res) => {
  try {
    const { name } = req.body; // Obtiene los datos del cuerpo de la solicitud

    // Crea un nuevo documento basado en el modelo
    const newTag = new Tag({
      name,
    });

    // Guarda el documento en MongoDB
    const savedTag = await newTag.save();

    // Responde con la etiqueta guardada
    res.status(201).json(savedTag);
  } catch (error) {
    console.error("Error inserting tag:", error);
    res.status(500).json({ message: "Error inserting tag", error });
  }
});

export default router;
