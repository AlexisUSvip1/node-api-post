// src/routes/post.routes.js
import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

import { getPosts, createPost } from "../controllers/postController.js";

router.get("/post-dev-get", ensureAuthenticated, getPosts);
router.post("/post-dev", ensureAuthenticated, createPost);

export default router;
