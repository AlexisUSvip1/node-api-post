// src/routes/userInteractionHistory.routes.js
import express from "express";
import {
  getInteractions,
  addInteractionHistory,
} from "../controllers/userInteractionHistoryController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

const router = express.Router();

router.get("/get-interactions", ensureAuthenticated, getInteractions);
router.post(
  "/add-interaction-history",
  ensureAuthenticated,
  addInteractionHistory
);

export default router;
