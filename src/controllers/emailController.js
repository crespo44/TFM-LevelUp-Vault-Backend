const emailService = require('../services/emailService');

const sendEmail = async (req, res) => {
  try {
    const result = await emailService.sendEmail(req.body);
    
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error en el controlador de email:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const contactFormEmail = async (req, res) => {
  try {
    const { name, email, comment } = req.body;

    
    if (!name || !email || !comment) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const result = await emailService.sendContactEmail({ name, email, comment });

    if (result.success) {
      return res.status(200).json({ comment: result.comment });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error en contactFormEmail:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const testRoute = (req, res) => {
  res.send('Servidor de emails funcionando correctamente.');
};

module.exports = {
  sendEmail,
  contactFormEmail,
  testRoute
}; 