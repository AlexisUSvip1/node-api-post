// src/controllers/user.controller.js
import { User } from '../../models/users-models/user.schema.js';
import { validateEmailUser } from '../../utils/validators.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { display_name, family_name, email, avatar_url } = req.body;

    const isValidEmail = await validateEmailUser(email);
    if (!isValidEmail) {
      return res
        .status(400)
        .json({ message: "El correo electrónico no es válido." });
    }

    const newUser = new User({
      display_name,
      family_name,
      email,
      avatar_url,
    });

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al insertar el usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al insertar el usuario", error });
  }
};
export const getNewFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const users = await User.find()
      .select("display_name avatar_url email friends")
      .lean();

    const filteredUsers = users.filter(
      (user) => user._id.toString() !== userId
    );

    console.log(filteredUsers);

    if (!filteredUsers.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: "Error al obtener usuarios", error: err });
  }
};
export const sendRequestFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    if (userId === friendId) {
      return res.status(400).send("Cannot send friend request to yourself");
    }

    const [sender, recipient] = await Promise.all([
      User.findById(userId),
      User.findById(friendId),
    ]);

    if (!sender || !recipient) {
      return res.status(404).send("User not found");
    }

    // Ya existe en el remitente
    const senderExists = sender.friends.some(
      (f) => f.user.toString() === friendId
    );
    // Ya existe en el destinatario
    const recipientExists = recipient.friends.some(
      (f) => f.user.toString() === userId
    );

    if (senderExists || recipientExists) {
      return res.status(400).send("Friend request already exists");
    }

    // Agregar en ambos
    sender.friends.push({ user: friendId, status: "pending" });
    recipient.friends.push({ user: userId, status: "pending" });

    await Promise.all([sender.save(), recipient.save()]);

    return res.status(200).send("Friend request sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};