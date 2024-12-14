import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Importar la estrategia de Google
import dotenv from "dotenv";
import { User } from "../models/user.schema.js";

dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializando usuario:", user._id); // Aquí utilizamos el _id generado automáticamente por MongoDB
  done(null, user._id); // Serializamos el campo _id
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializando usuario con id:", id); // Asegúrate de que id sea un ObjectId válido
    const user = await User.findById(id); // Busca al usuario por su _id
    done(null, user);
  } catch (err) {
    console.error("Error al deserializar el usuario:", err);
    done(err, null);
  }
});
export default passport;
