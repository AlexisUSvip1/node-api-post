import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./src/middlewares/passport.js";
import sessionConfig from "./src/middlewares/session.js";
import corsOptions from "./src/middlewares/cors.js";
import connectDB from "./src/database/mongodb.js";
import authRouter from "./src/routes/auth.router.js";
import postRouter from "./src/routes/post.router.js";
import userRouter from "./src/routes/users.router.js";
import tagsRouter from "./src/routes/tags.router.js";
import comment from "./src/routes/comment.router.js";
import userInteractionHistoryRoutes from "./src/routes/user_interaction.router.js";
import userRoutes from "./src/routes/users.router.js";
import { configureGoogleOAuth } from "./src/config/googleOAuth.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Conectar a MongoDB
connectDB();

// Configurar Google OAuth
configureGoogleOAuth();

// Aplica la configuración de CORS globalmente
app.use(cors(corsOptions));

// Configura la sesión de Express
app.use(sessionConfig);

// Middleware para manejar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Inicializa Passport y la sesión de Passport
app.use(passport.initialize());
app.use(passport.session());

// Usar el postRouter para manejar las rutas relacionadas con las publicaciones
app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api", tagsRouter);
app.use("api/", comment);
app.use("/api", userInteractionHistoryRoutes);
app.use("/api", userRoutes);
app.use("/auth", authRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res
    .status(404)
    .json({ error: "Acceso no autorizado. Por favor, inicia sesión." });
});


app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
