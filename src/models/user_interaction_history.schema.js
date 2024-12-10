import mongoose from "mongoose";

// Define el schema para la tabla de interacciones de usuarios
const userInteractionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relación con la colección de usuarios
      required: true,
      description: "Relación de muchos a uno con usuarios",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Relación con la colección de publicaciones
      required: true,
      description: "Relación de muchos a uno con publicaciones",
    },
    interaction_type: {
      type: String,
      required: true,
      enum: ["like", "comment"], // Tipo de interacción, puede ser 'like' o 'comment'
      description: "Tipo de interacción: 'like' o 'comment'",
    },
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Relación con la colección de comentarios (si es un comentario)
      default: null, // Si no es un comentario, este campo será null
      description: "Referente al comentario realizado, null si es un like",
    },
    created_at: {
      type: Date,
      default: Date.now, // Fecha y hora de la interacción, por defecto es la hora actual
      description: "Fecha y hora de la interacción",
    },
  },
  {
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
  }
);

export const UserInteractionHistory = mongoose.model(
  "UserInteractionHistory",
  userInteractionSchema
);
