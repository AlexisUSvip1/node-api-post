import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definir el esquema de Post
const postSchema = new Schema({
  title: {
    type: String,
    required: true, // El título es obligatorio
  },
  body: {
    type: String,
    required: true, // El cuerpo del post es obligatorio
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia al modelo 'User'
    required: true,
  },
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypePost", // Referencia al modelo 'TypePost'
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published"], // Valores posibles para el estado del post
    default: "draft",
  },
  likes: {
    type: Number,
    default: 0, // Número de likes, por defecto es 0
  },
  views: {
    type: Number,
    default: 0, // Número de vistas, por defecto es 0
  },
  media: {
    type: [
      {
        url: { type: String, required: true }, // URL del medio (foto, video, etc.)
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        }, // Tipo de medio
      },
    ],
    default: [], // Por defecto, no hay medios
  },
  background: {
    type: String, // Puede representar el estado de fondo, como "draft" o "published"
    default: "draft",
  },
  created_at: {
    type: Date,
    default: Date.now, // La fecha de creación, por defecto es la fecha actual
  },
  updated_at: {
    type: Date,
    default: Date.now, // La fecha de actualización, por defecto es la fecha actual
  },
});

// Crear el modelo a partir del esquema
export const Post = mongoose.model("Post", postSchema);
