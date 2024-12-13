import session from "express-session";

const sessionConfig = session({
  secret: "secret", // Clave para firmar las sesiones
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});

export default sessionConfig;
