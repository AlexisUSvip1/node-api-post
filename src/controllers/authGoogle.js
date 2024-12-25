import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Autenticación con Google
export const authenticate = passport.authenticate("google", {
  scope: ["profile", "email"], // Los datos que solicitamos de Google
});

export const callback = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false }, // Disable session since this is stateless
    (err, user, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Authentication error", error: err });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found or unauthorized" });
      }

      // Respond with user data and token
      const tokenPayload = {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.send(`
        <script>
          window.opener.postMessage(${JSON.stringify(
            token
          )}, "http://localhost:5173");
          window.close();
        </script>
      `);
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

// Serialización y deserialización del usuario
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
