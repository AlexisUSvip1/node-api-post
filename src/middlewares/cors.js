const corsOptions = {
  origin: "http://localhost:5173", // Permite solicitudes solo desde esta URL
  methods: ["GET", "POST"], // Métodos permitidos
  credentials: true, // Asegura que las credenciales como cookies se envíen
};

export default corsOptions;
