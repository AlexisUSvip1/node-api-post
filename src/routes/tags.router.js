// src/routes/tag.routes.js
import express from "express";
import { getTags, createTag } from "../controllers/tagsController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

const router = express.Router();

router.get("/get-tags", ensureAuthenticated, getTags);
router.post("/post-tags", ensureAuthenticated, createTag);

export default router;
