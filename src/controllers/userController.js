// src/controllers/user.controller.js
import { User } from "../models/user.schema.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return res.status(500).json({ message: "Error fetching user", error });
  }
};


export const createUser = async (req, res) => {
  try {
    const { display_name, family_name, email, avatar_url } = req.body;

    const newUser = new User({
      display_name,
      family_name,
      email,
      avatar_url,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error inserting users:", error);
    return res.status(500).json({ message: "Error inserting users", error });
  }
};
