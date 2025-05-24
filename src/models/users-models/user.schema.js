import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  status: {
    type: String,
    enum: ["no-status", "pending", "accepted", "rejected"],
    default: "no-status",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: Date,
});
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
    },
    family_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar_url: {
      type: String,
      trim: true,
      description: "URL del avatar del usuario proporcionada por Google",
    },
    friends: { type: [friendSchema], default: [] },
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
  }
);

export const FriendsUser = mongoose.model("friends", friendSchema);
export const User = mongoose.model('users', userSchema);
