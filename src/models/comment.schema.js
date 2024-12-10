import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
      description: "Contenido del comentario",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relación con el modelo User
      required: true,
      description: "ID del usuario que realizó el comentario",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Relación con el modelo Post
      required: true,
      description: "ID de la publicación en la que se hizo el comentario",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
