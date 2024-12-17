import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Permite que un campo pueda ser único pero con valores nulos
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true, // Lo mismo para Facebook
    },
    display_name: {
      type: String,
      required: true,
      trim: true,
      description:
        "Nombre completo del usuario, por ejemplo, Sotelo Ultreras Alexis",
    },
    family_name: {
      type: String,
      required: true,
      trim: true,
      description: "Apellido, por ejemplo, Alexis",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      description:
        "Correo electrónico del usuario, por ejemplo, alexisultreras01@gmail.com",
    },
    avatar_url: {
      type: String,
      trim: true,
      description: "URL del avatar del usuario proporcionada por Google",
    },
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
  }
);
// Asegúrate de que no se guarde un mismo email con diferentes ID de Google o Facebook
userSchema.index({ email: 1, googleId: 1 }, { unique: true });
userSchema.index({ email: 1, facebookId: 1 }, { unique: true });

export const User = mongoose.model("users", userSchema);
