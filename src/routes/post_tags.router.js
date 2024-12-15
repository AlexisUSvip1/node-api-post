// src/routes/postTag.routes.js
import express from "express";
import { addPostTag, getPostTags } from "../controllers/post_tagsController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

const router = express.Router();

router.post("/add-post-tag", ensureAuthenticated, addPostTag);
router.get("/get-post-tags", ensureAuthenticated, getPostTags);

export default router;
