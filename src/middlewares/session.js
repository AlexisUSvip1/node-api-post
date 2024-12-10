import session from "express-session";

const sessionConfig = session({
  secret: "secret", // Clave para firmar las sesiones
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Cambia a true si usas HTTPS
});

export default sessionConfig;
