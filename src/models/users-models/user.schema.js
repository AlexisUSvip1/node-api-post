import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Permite que un campo pueda ser único pero con valores nulos
    },
    display_name: {
      type: String,
      required: true,
      trim: true,
      description: 'Nombre completo del usuario, por ejemplo, Sotelo Ultreras Alexis',
    },
    family_name: {
      type: String,
      required: true,
      trim: true,
      description: 'Apellido, por ejemplo, Alexis',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      description: 'Correo electrónico del usuario, por ejemplo, alexisultreras01@gmail.com',
    },
    avatar_url: {
      type: String,
      trim: true,
      description: 'URL del avatar del usuario proporcionada por Google',
    },
    friends: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
        respondedAt: Date,
      },
    ],
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
  }
);

export const User = mongoose.model('users', userSchema);
