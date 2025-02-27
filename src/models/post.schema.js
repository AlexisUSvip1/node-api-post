import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  url: {
    type: String, // Ruta o URL del archivo (e.g., "/uploads/image1.jpg")
    required: true, // Obligatorio porque cada medio debe tener una referencia
  },
  type: {
    type: String,
    enum: ["image", "video", "audio"], // Tipos de medios permitidos
    required: true, // Obligatorio
  },
});

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
    ref: "User",
    required: false,
  },
  user_avatar: {
    type: String,
    required: false,
  },
  usernameUser: { type: String, required: true },  // 🔹 Se agrega username aquí
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
    type: [mediaSchema], // Array de medios (imágenes, videos, audios)
    default: [], // Por defecto, el post puede no tener medios
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
