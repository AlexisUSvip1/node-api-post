// src/routes/postTag.routes.js
import express from "express";
import { addPostTag, getPostTags } from "../controllers/post_tagsController.js";

const router = express.Router();

router.post("/add-post-tag", addPostTag);
router.get("/get-post-tags", getPostTags);

export default router;
