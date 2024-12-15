// src/routes/comment.routes.js

import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

const router = express.Router();

router.post("/post-comment", ensureAuthenticated, createComment);
router.get("/get-comments", ensureAuthenticated, getComments);

export default router;
