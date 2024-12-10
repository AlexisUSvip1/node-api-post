import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Cambio aquí
import dotenv from "dotenv";
dotenv.config();

// Autenticación con Google
export const authenticate = passport.authenticate("google", {
  scope: ["profile", "email"], // Los datos que solicitamos de Google
});

// Callback después de la autenticación
export const callback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/" },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/");
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("http://localhost:3000/auth/profile");
      });
    }
  )(req, res, next);
};

// Otras rutas de Google
export const success = (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.json(userInfo);
};

export const error = (req, res) => {
  res.send("Error al iniciar sesión con Google.");
};

export const signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).send({ message: "Error al cerrar sesión" });
    } else {
      res.redirect("/"); // Redirige al inicio después de cerrar sesión
    }
  });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Debes definir este valor en tu archivo .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Debes definir este valor en tu archivo .env
      callbackURL: "http://localhost:3000/auth/google/callback", // Esta es la URL de callback
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialización y deserialización del usuario
passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
