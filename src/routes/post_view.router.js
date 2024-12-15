// src/routes/postView.routes.js
import express from "express";
import { viewPost, getPostViews } from "../controllers/postViewController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware

const router = express.Router();

router.post("/view-post", ensureAuthenticated, viewPost);
router.get("/get-post-views", ensureAuthenticated, getPostViews);

export default router;
