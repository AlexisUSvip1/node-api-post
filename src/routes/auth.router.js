import express from "express";
const router = express.Router();

// Importa las funciones desde authGoogle.js
import {
  authenticate,
  callback,
  success,
  error,
  signout,
} from "../controllers/authGoogle.js";
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

// Ruta para obtener los datos del usuario autenticado
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.json(req.user); // Devuelve los datos del usuario autenticado
  } else {
    res.status(401).json({ error: "Usuario no autenticado" });
  }
});

router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

router.get("/profile", (req, res) => {
  console.log(req.user);
  res.send(`Welcome ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

export default router; // Usando la exportación de ES Modules
