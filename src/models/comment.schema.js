import mongoose from "mongoose";


const ResponseCommentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      description: "Contenido de la respuesta",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relación con el modelo User
      required: true,
      description: "ID del usuario que realizó la respuesta",
    },
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Relación con el modelo Comment
      required: true,
      description: "ID del comentario al que se responde",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
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
    user_avatar: {
      type: String,
      required: false,
    },
    userName: { type: String, required: true },
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
export const ResponseComment = mongoose.model(
  "ResponseComment",
  ResponseCommentSchema
);