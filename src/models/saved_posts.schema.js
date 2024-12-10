import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relación con el modelo User
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Relación con el modelo Post
      required: true,
    },
  },
  {
    timestamps: { createdAt: "saved_at", updatedAt: false },
  }
);

export const SavedPost = mongoose.model("SavedPost", savedPostSchema);
