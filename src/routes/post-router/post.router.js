// src/routes/post.routes.js
import express from 'express';
const router = express.Router();
import {
  getPosts,
  createPost,
  updatePostLike,
  checkUserLike,
  updateSavePost,
  checkUserSaved,
} from "../controllers/postController.js";
import multer from "multer";

// Configurar almacenamiento con `multer`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

router.get("/post-dev-get", getPosts);
router.post("/post-dev", uploads.array("files", 5), createPost);

router.patch("/post-dev/:id/like", updatePostLike);
router.get("/post-dev-total-likes/:idPost/:idUser/like", checkUserLike);

router.patch("/post-dev/:id/save", updateSavePost);
router.get("/post-dev/:postId?/:userId/save", checkUserSaved);
export default router;
