// src/routes/user.routes.js
import express from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  getNewFollowers,
  sendRequestFriend,
} from '../../controllers/users-controller/userController.js';
const router = express.Router();

router.get('/get-users', getUsers);
router.post('/post-users', createUser);
router.get('/get-user/:id', getUserById);
router.get("/newFollowers/:userId/", getNewFollowers);
router.post('/sendRequestFriend/:userId/:friendId', sendRequestFriend);

export default router;
