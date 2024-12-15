export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ error: "Acceso no autorizado. Por favor, inicia sesión." });
};
