// src/routes/user.routes.js
import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js"; // Importa el middleware
const router = express.Router();

router.get("/get-users", ensureAuthenticated, getUsers);
router.post("/post-users", ensureAuthenticated, createUser);

export default router;
