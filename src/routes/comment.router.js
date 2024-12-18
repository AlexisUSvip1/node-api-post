// src/routes/comment.routes.js

import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/post-comment", createComment);
router.get("/get-comments", getComments);

export default router;
