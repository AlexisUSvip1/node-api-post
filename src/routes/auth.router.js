import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const router = express.Router();
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
// Importa las funciones desde authGoogle.js
import {
  authenticate as googleAuthenticate,
  callback as googleCallback,
} from "../controllers/authGoogle.js";

// Rutas de Google
router.get("/google", googleAuthenticate); // Aquí usamos 'authenticate' de 'authGoogle'
router.get("/google/callback", googleCallback); // Aquí usamos 'callback' de 'authGoogle'

router.get("/me", ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/", (req, res) => {
  res.send(`
    <a href='/auth/google'>Login with Google</a><br>
  `);
});
router.get("/profile", (req, res) => {
  const token = req.query.token;
  console.log(req.query);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.send(`Welcome ${decoded.displayName || decoded.email}`);
    } catch (error) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }
  }

  // Si no hay token, simplemente muestra la página
  res.send("Welcome to your profile. No token provided.");
});
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
