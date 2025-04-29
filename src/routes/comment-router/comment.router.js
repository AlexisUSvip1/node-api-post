// src/routes/comment.routes.js

import express from "express";
import {
  createComment,
  getCommentsById,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/post-comment/:id", createComment);
router.get("/get-comment/:id", getCommentsById);

export default router;
