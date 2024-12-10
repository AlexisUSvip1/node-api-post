// src/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

// Función para conectar a MongoDB
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => {
      console.log("Conectado a MongoDB");
    })
    .catch((error) => {
      console.error("Error al conectar a MongoDB:", error);
    });
};

export default connectDB;
