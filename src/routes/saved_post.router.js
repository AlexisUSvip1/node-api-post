// src/routes/savedPost.routes.js
import express from "express";
import {
  savePost,
  getSavedPosts,
} from "../controllers/savedPost.controller.js";

const router = express.Router();

router.post("/save-post", savePost);
router.get("/get-saved-posts", getSavedPosts);

export default router;
