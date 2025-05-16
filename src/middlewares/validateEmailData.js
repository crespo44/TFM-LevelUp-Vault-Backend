
const validateEmailData = (req, res, next) => {
  const { name, email, username , rol} = req.body;
  

  if (!name || !username || !email || !rol) {
    return res.status(400).json({ error: 'Faltan datos en el formulario.' });
  }
  
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'El nombre no es válido.' });
  }

  if (typeof username !== 'string' || username.trim().length === 0) {
    return res.status(400).json({ error: 'El nombre de usuario no es válido.' });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'El email no es válido.' });
  }

  if (typeof rol !== 'string' || rol.trim().length === 0) {
    return res.status(400).json({ error: 'El rol no es válido.' });
  }

  
  next();
};

module.exports = validateEmailData; 