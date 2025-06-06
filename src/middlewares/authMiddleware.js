const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (permittedRoles = []) => (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(' ')[1];;
  if (!token) return res.status(401).json({ message: 'No existe token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;

    if (permittedRoles.length > 0 && (!req.user || !permittedRoles.includes(req.user.rol))) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado" });
      }

      console.error("Error de verificación JWT:", error.message);
      return res.status(403).json({ message: "Token inválido" });
  }
};


module.exports = { verifyToken };