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
      return res.status(400).json({ message: 'El correo electrónico no es válido.' });
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
    console.error('Error al insertar el usuario:', error);
    return res.status(500).json({ message: 'Error al insertar el usuario', error });
  }
};

export const getNewFollowers = async (req, res) => {
  try {
    const newFollowers = await User.find({
      $or: [{ friends: { $exists: false } }, { friends: { $size: 0 } }],
    }).select('display_name avatar_url'); // solo lo necesario

    res.status(200).json(newFollowers);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener seguidores', error: err });
  }
};

export const sendRequestFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params; // O los valores que estés usando

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Verifica si ya existe en el array de amigos
    const friend = { user: friendId, status: 'pending' };

    user.friends.push(friend); // Aquí deberías estar agregando el 'user' correctamente
    await user.save();

    res.status(200).send('Friend request sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
