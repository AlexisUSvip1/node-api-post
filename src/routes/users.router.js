// src/routes/user.routes.js
import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/get-users", getUsers);
router.post("/post-users", createUser);

export default router;
