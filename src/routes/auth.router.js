import express from "express";
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
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.display_name}`);
});
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router;
