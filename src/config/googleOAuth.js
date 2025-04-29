// config/passport.js
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
          let user = await User.findOne({ email: profile.emails[0]?.value });

          if (!user) {
            if (!profile.emails || !profile.emails[0]?.value) {
              throw new Error("La cuenta de Google no tiene un email válido.");
            }

            user = new User({
              googleId: profile.id,
              display_name: profile.displayName,
              family_name: profile.name?.familyName || "",
              email: profile.emails[0].value,
              avatar_url: profile.photos[0]?.value || "",
            });

            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error("Error en el callback de Google:", err);
          return done(err, null);
        }
      }
    )
  );
};

// Serializar y deserializar
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
