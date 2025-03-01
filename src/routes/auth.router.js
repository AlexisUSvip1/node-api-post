import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
import { ensureAuthenticated } from '../middlewares/authMiddleware.js';
// Importa las funciones desde authGoogle.js
import {
  authenticate as googleAuthenticate,
  callback as googleCallback,
} from '../controllers/authGoogle.js';

// Rutas de Google
router.get('/google', googleAuthenticate); // Aquí usamos 'authenticate' de 'authGoogle'
router.get('/google/callback', googleCallback); // Aquí usamos 'callback' de 'authGoogle'

router.get('/me', ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

export default router;
