import mongoose from "mongoose";

const postViewSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Relación con el modelo Post
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relación con el modelo User
      required: true,
    },
  },
  {
    timestamps: { createdAt: "viewed_at", updatedAt: false },
  }
);

export const PostView = mongoose.model("PostView", postViewSchema);
