import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      description: "Nombre del tag, por ejemplo, 'React', 'Node.js'",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

export const Tag = mongoose.model("Tag", tagSchema);
