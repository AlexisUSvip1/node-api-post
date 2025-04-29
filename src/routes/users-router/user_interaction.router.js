// src/routes/userInteractionHistory.routes.js
import express from "express";
import {
  getInteractions,
  addInteractionHistory,
} from "../controllers/userInteractionHistoryController.js";

const router = express.Router();

router.get("/get-interactions", getInteractions);
router.post("/add-interaction-history", addInteractionHistory);

export default router;
