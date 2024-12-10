import mongoose from "mongoose";

const postTagSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Relación con el modelo Post
      required: true,
    },
    tag_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag", // Relación con el modelo Tag
      required: true,
    },
  },
  {
    timestamps: false, // No es necesario agregar timestamps
  }
);

export const PostTag = mongoose.model("PostTag", postTagSchema);
