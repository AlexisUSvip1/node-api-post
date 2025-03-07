import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  url: {
    type: String, // Ruta o URL del archivo (e.g., "/uploads/image1.jpg")
    required: true, // Obligatorio porque cada medio debe tener una referencia
  },
  type: {
    type: String,
    enum: ['image', 'video', 'audio'], // Tipos de medios permitidos
    required: true, // Obligatorio
  },
});

const LikeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  like: { type: Boolean, default: false },
});
const SaveSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  savePost: { type: Boolean, default: false },
});
// Definir el esquema de Post
const postSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  user_avatar: {
    type: String,
    required: false,
  },
  usernameUser: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  total_likes: {
    type: Number,
    default: 0,
  },
  total_saves: { type: Number, default: 0 },
  media: {
    type: [mediaSchema],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  tags: { type: [String], default: [] },
});

postSchema.pre('save', async function (next) {
  const post = this;
  const likesCount = await mongoose.model('Like').countDocuments({ postId: post._id, like: true });
  post.total_likes = likesCount;

  const savesCount = await mongoose
    .model('Save')
    .countDocuments({ postId: post._id, savePost: true });
  post.total_saves = savesCount;

  next();
});

// Crear los modelos a partir del esquema
export const Post = mongoose.model('Post', postSchema);
export const Like = mongoose.model('Like', LikeSchema);
export const Save = mongoose.model('Save', SaveSchema);
