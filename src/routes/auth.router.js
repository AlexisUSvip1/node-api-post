import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
// Importa las funciones desde authGoogle.js
import { authenticate, callback } from "../controllers/authGoogle.js";
// Importa las funciones desde authFacebook.js
import facebookAuth from "../controllers/authFacebook.js";
// Importa el controlador de registro

// Rutas de Google
router.get("/google", authenticate); // Aquí usamos 'authenticate' de 'authGoogle'
router.get("/google/callback", callback); // Aquí usamos 'callback' de 'authGoogle'

// Rutas de Facebook
router.get("/facebook", facebookAuth.authenticate);
router.get("/facebook/callback", facebookAuth.callback);
router.get("/facebook/success", facebookAuth.success);
router.get("/facebook/error", facebookAuth.error);
router.get("/facebook/signout", facebookAuth.signout);

router.get("/me", ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
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
