// src/routes/postView.routes.js
import express from "express";
import { viewPost, getPostViews } from "../controllers/postViewController.js";

const router = express.Router();

router.post("/view-post", viewPost);
router.get("/get-post-views", getPostViews);

export default router;
