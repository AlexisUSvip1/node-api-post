import passport from "passport";

// Autenticación con Facebook
const authenticate = passport.authenticate("facebook", { scope: "email" });

// Callback de Facebook después de la autenticación
const callback = (req, res, next) => {
  passport.authenticate(
    "facebook",
    { failureRedirect: "/auth/facebook/error" },
    (err, user, info) => {
      if (err) {
        return next(err); // Manejo de errores
      }
      if (!user) {
        return res.redirect("/auth/facebook/error"); // Si no se autentica correctamente, redirige a la página de error
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        // Redirige al frontend después de la autenticación
        res.redirect("http://localhost:5173/inicio");
      });
    }
  )(req, res, next);
};

// Ruta de éxito de Facebook
const success = (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  // Enviar información del usuario autenticado (puedes personalizar esta vista)
  res.json(userInfo);
};

// Ruta de error de Facebook
const error = (req, res) => {
  res.send("Error al iniciar sesión con Facebook.");
};

// Cerrar sesión de Facebook
const signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).send({ message: "Error al cerrar sesión" });
    } else {
      res.redirect("/"); // Redirige al inicio después de cerrar sesión
    }
  });
};

// Exportar los controladores
export default {
  authenticate,
  callback,
  success,
  error,
  signout,
};
