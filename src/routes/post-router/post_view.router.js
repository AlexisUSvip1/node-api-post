// src/routes/postView.routes.js
import express from "express";
import {
  viewPost,
  getPostViews,
} from "../../controllers/post-controller/postViewController";

const router = express.Router();

router.post("/view-post", viewPost);
router.get("/get-post-views", getPostViews);

export default router;
