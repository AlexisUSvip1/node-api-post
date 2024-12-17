import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "../models/user.schema.js";
export const configureGoogleOAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Busca al usuario en la base de datos por su email
          let user = await User.findOne({ email: profile.emails[0]?.value });

          if (!user) {
            if (!profile.emails || !profile.emails[0]?.value) {
              throw new Error("La cuenta de Google no tiene un email válido.");
            }
            const googleId = profile.id || undefined;

            user = new User({
              googleId,
              display_name: profile.displayName,
              family_name: profile.name?.familyName || "",
              email: profile.emails[0].value,
              avatar_url: profile.photos[0]?.value || "",
            });

            await user.save();
          }

          return done(null, user); // Pasa el usuario a Passport
        } catch (err) {
          console.error("Error en el callback de Google:", err);
          return done(err, null);
        }
      }
    )
  );
};
