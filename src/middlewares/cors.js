const corsOptions = {
  origin: "http://127.0.0.1:5500", // Permite solicitudes solo desde esta URL
  methods: ["GET", "POST"], // Métodos permitidos
  credentials: true, // Asegura que las credenciales como cookies se envíen
};

export default corsOptions;
