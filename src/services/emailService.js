const { createTransporter, config } = require('../config/configEmail');

const createEmailHtml = (name, username, email, rol) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mensaje de Contacto</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #5698e8;
          color: white;
          padding: 18px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #ebf2fb;
          border: 1px solid #ddd;
          border-radius: 0 0 5px 5px;
        }
        .data {
          background-color: white;
          padding: 15px;
          margin: 20px 0;
          border-radius: 11px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>¡Bienvenido a la Agenda de Eventos!</h1>
      </div>
      <div class="content">
        <p>Estimado/a ${name},</p>
        <p>¡Te damos la bienvenida a la Agenda de Eventos. Nos complace mucho que te unas a nosotros.</p>        
        <h3>Tu datos de inscripcion:</h3>
        <div class="data">
          <strong>Nombre:</strong> <p>${name}</p>
          <strong>Nombre de usuario:</strong> <p>${username}</p>
          <strong>Email:</strong> <p><a href="mailto:${email}">${email}</a></p>
          <strong>Rol:</strong> <p>${rol}</p>
        </div>
      </div>
      <div class="footer">
        <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        <p>&copy; ${new Date().getFullYear()} Cfespo. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;
};


const sendEmail = async (data) => {
  const { name, email, username, rol } = data;
  const transporter = createTransporter();
  
  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: `Hola ${name}, hemos recibido tu mensaje`,
    html: createEmailHtml(name, username, email, rol),
    text: `Hola ${name},\n\nGracias por inscribirte. Hemos recibido sus datos:\n\n"${username}"\n\nSaludos,\nEl equipo Cfespo.`,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
    return { success: true, message: 'Correo enviado exitosamente.' };
  } catch (error) {
    console.error('Error al enviar el email:', error);
    return { success: false, error: 'Error al enviar el correo.' };
  }
};

module.exports = {
  sendEmail
}; 