// src/routes/post.routes.js
import express from "express";
const router = express.Router();

import { getPosts, createPost } from "../controllers/postController.js";

router.get("/post-dev-get", getPosts);
router.post("/post-dev", createPost);

export default router;
