# LevelUp Vault - Organizador de Videojuegos

**LevelUp Vault** es una aplicación web desarrollada para ayudarte a organizar tus videojuegos. Permite registrar, visualizar y gestionar los títulos que has jugado, estás jugando o planeas jugar. Además, ofrece una sección de noticias actualizadas sobre videojuegos, brindando una experiencia completa y personalizada.

## 🎮 Funcionalidades Principales

- **Gestión de videojuegos personales:** Registra y organiza videojuegos en listas personalizadas.
- **Buscador con filtros avanzados:** Encuentra fácilmente títulos entre tus juegos almacenados.
- **Integración con API externa:** Muestra imágenes de juegos automáticamente. En ausencia de una imagen, se utiliza una genérica.
- **Carga de imágenes personalizadas:** Permite al usuario añadir o eliminar imágenes propias para cada juego.
- **Sistema de autenticación seguro:** Registro con confirmación por correo electrónico, encriptación de contraseñas, y validación mediante JWT (Json Web Token).
- **Panel de administración:** Los administradores pueden gestionar usuarios, juegos e imágenes de forma exclusiva.
- **Validación robusta:** Validación de datos tanto en frontend como en backend para evitar errores.
- **Secciones adicionales:** Acceso a noticias de videojuegos, sección de contacto y panel informativo desde el inicio.

---

## 🧪 Tecnologías Utilizadas

### Backend (Node.js + Express + MongoDB)
- 🟩 **Node.js** – Entorno de ejecución para JavaScript.
- 🚂 **Express.js**– Framework web principal.
- 🍃**MongoDB** & 🧬**Mongoose** – Base de datos NoSQL y modelado de datos.
- 🔐**JWT (jsonwebtoken)** – Autenticación basada en tokens.
- 🔒**bcrypt** – Encriptación de contraseñas.
- 📧**nodemailer** – Envío de correos electrónicos para la verificación de cuenta.
- 🖼️**multer** & ☁️**cloudinary** – Gestión y almacenamiento de imágenes.
- 🛡️**helmet**, 🔄**cors**, 🧱**express-rate-limit** – Seguridad y control de acceso.
- 🧹**express-validator**, **🧼mongo-sanitize** – Validación y sanitización de datos.
- 🚀**Render** - Despliegue del proyecto para los archivos del backend mediante Render.

### Frontend (React + Vite)
- ⚛️**React 19** – Biblioteca principal para construir interfaces de usuario.
- 🌐**React Router Dom** – Enrutamiento dinámico en la SPA.
- 📝**React Hook Form** + ✅**Yup** – Manejo de formularios y validación.
- 🧰**Redux Toolkit** & 🔁**React-Redux** – Manejo eficiente del estado global.
- 🔍**TanStack React Query** – Gestión de peticiones y sincronización de datos.
- 🌍**Axios** – Cliente HTTP para consumir la API.
- 🔔**React Toastify** – Notificaciones elegantes y configurables.
- 🔺**Vercel** - Despliegue del proyecto para los archivos del frontend mediante Vercel.

---

## 📁 Estructura del Proyecto

Este proyecto está dividido en dos repositorios independientes:
- **TFM-LevelUp-Vault-Backend.git** – Contiene el servidor Express, modelos de datos, controladores, rutas y configuración de base de datos.
- **TFM-LevelUp-Vault-Frontend.git**  – Contiene la interfaz React, páginas, componentes, vistas, rutas, y gestión de estado.

---

Este proyecto ha sido diseñado con un enfoque en la seguridad, escalabilidad y experiencia de usuario. Es ideal para cualquier entusiasta de los videojuegos que desee llevar un control detallado y personalizado de su colección.