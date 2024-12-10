import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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

export const User = mongoose.model("User", userSchema);
