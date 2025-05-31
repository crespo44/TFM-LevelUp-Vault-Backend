const { createTransporter, config } = require('../config/configEmail');

const createEmailHtml = (name, username, email, rol) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Bienvenido a Level Up Vault</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #e0e0e0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

        <div style="background-color: #7c4dff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px; color: #ffffff;">¡Bienvenido a Level Up Vault!</h1>
        </div>

        <div style="background-color: #2a2a3c; padding: 20px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; margin-top: 0;">Hola <strong>${name}</strong>,</p>
          <p>Gracias por registrarte en <strong>Level Up Vault</strong>, tu espacio para organizar tus videojuegos de forma personalizada y completa.</p>

          <h3 style="color: #9e7eff;">Datos de tu cuenta:</h3>
          <div style="background-color: #1c1c28; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Usuario:</strong> ${username}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #9e7eff;">${email}</a></p>
            <p><strong>Rol:</strong> ${rol}</p>
          </div>

          <p style="font-size: 14px;">¡Explora, organiza y disfruta tus juegos con estilo!</p>
        </div>

        <div style="text-align: center; font-size: 12px; color: #a0a0b0; margin-top: 20px;">
          <p>Este es un correo automático. Por favor, no respondas a este mensaje.</p>
          <p>&copy; ${new Date().getFullYear()} LevelUpVault. Todos los derechos reservados.</p>
        </div>

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

const sendContactEmail = async (data) => {
  const { name, email, comment } = data;
  const transporter = createTransporter();

  const mailOptions = {
    from: email,    
    to: config.EMAIL_USER,     
    subject: `Nuevo mensaje de contacto de ${name}`,
    html: `
      <h2>Nuevo mensaje desde el formulario de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Mensaje:</strong></p>
      <div style="border:1px solid #eee; background:#f9f9f9; padding:1em; border-radius:5px;">
        ${comment.replace(/\n/g, "<br>")}
      </div>
    `,
    text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${comment}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Mensaje de contacto enviado: ' + info.response);
    return { success: true, message: 'Mensaje de contacto enviado exitosamente.' };
  } catch (error) {
    console.error('Error al enviar el mensaje de contacto:', error);
    return { success: false, error: 'Error al enviar el mensaje de contacto.' };
  }
};


module.exports = {
  sendEmail,
  sendContactEmail
}; 