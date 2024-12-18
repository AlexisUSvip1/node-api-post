// src/routes/tag.routes.js
import express from "express";
import { getTags, createTag } from "../controllers/tagsController.js";

const router = express.Router();

router.get("/get-tags", getTags);
router.post("/post-tags", createTag);

export default router;
