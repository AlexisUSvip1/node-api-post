import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const ensureAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado: Token no proporcionado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = decoded; // Adjunta la información del usuario al request
    next(); // Pasa al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
