// src/routes/post.routes.js
import express from "express";
const router = express.Router();
import { upload } from "../middlewares/multerConfig.js";
import { getPosts, createPost } from "../controllers/postController.js";

router.get("/post-dev-get", getPosts);
router.post("/post-dev", upload.array("media", 5), createPost);

export default router;
