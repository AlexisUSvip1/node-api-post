import express from "express";
import { User } from "../models/user.schema.js";

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/get-users", async (req, res) => {
  try {
    // Obtiene todos los usuarios de la base de datos
    const users = await User.find();

    // Responde con los usuarios obtenidos
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.post("/post-users", async (req, res) => {
  try {
    const { display_name, family_name, email, avatar_url } = req.body;

    // Crea un nuevo documento basado en el modelo
    const newUser = new User({
      display_name,
      email,
      family_name,
      avatar_url,
    });

    // Guarda el documento en MongoDB
    const savedUser = await newUser.save();

    // Responde con el post guardado
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error inserting post:", error);
    res.status(500).json({ message: "Error inserting users", error });
  }
});
export default router;
