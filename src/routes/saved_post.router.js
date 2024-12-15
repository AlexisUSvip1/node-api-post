// src/routes/savedPost.routes.js
import express from "express";
import {
  savePost,
  getSavedPosts,
} from "../controllers/savedPost.controller.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

const router = express.Router();

router.post("/save-post", ensureAuthenticated, savePost);
router.get("/get-saved-posts", ensureAuthenticated, getSavedPosts);

export default router;
