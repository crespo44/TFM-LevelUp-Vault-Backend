const { getUsers, getUsersById, updateUser, insertUser, deleteUser, loginUser, searchUsers } = require('../services/userServices');
const { createUserValidations, updateUserValidations, getUserValidations, deleteUserValidations, loginValidations } = require('../validations/userValidations');

const userController = {
    getUserController: [
        ...getUserValidations,
        async (req, response) => {
            try {
                const data = await getUsers();
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger usuario de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger usuario de la BBDD' });
            }
        }
    ],

    searchUsersController: [
        async (req, response) => {
            try {
                const { name, username, email, rol } = req.query;
                const result = await searchUsers(name, username, email, rol);
                response.status(200).json(result||[]);
            } catch(e) {
                console.error('Error en búsqueda de usuarios', e.message);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    getUserControllerById: [
        ...getUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params; 
                const data = await getUsersById(id);
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger usuario de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger usuario de la BBDD' });
            }
        }
    ],


    createUser: [
        ...createUserValidations,
        async (req, response) => {
            try {
                const newUser = await insertUser(req.body);
                response.status(201).json(newUser);
            } catch(e) {
                console.log('Error al crear usuario', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateUser: [
        ...updateUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const userData = req.body;
                const updatedUser = await updateUser(id, userData);
                response.status(200).json(updatedUser);
            } catch(e) {
                console.log('Error al actualizar usuario', e);
                response.status(500).json({ error: 'Error al actualizar usuario' });
            }
        }
    ],
    
    deleteUser: [
        ...deleteUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const deletedUser = await deleteUser(id);
                response.status(200).json(deletedUser);
            } catch(e) {
                console.log('Error al eliminar el usuario', e);
                response.status(500).json({ error: 'Error al eliminar al usuario' });
            }
        }
    ],
    
    loginDataUser: [
        ...loginValidations,
        async (req, res) => {
          try {
            const { username, password } = req.body;
            const {token , user} = await loginUser(username, password);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' }); 
            }
    
            res.cookie('token', token, {
              httpOnly: true,
              secure: false,
              sameSite: 'Lax', 
              maxAge: 3600000,
              path: '/',
            });
    
    
            res.status(200).json({ message: 'Inicio de sesion exitoso', token, userId: user._id, rol: user.rol });
          } catch (error) {
            console.error('Error en el login:', error);
            res.status(401).json({ error: error.message });
          }
        },
      ],

    logoutUser: async (req, res) => {
      try {
        res.cookie('token', '', { 
          expires: new Date(0), 
          httpOnly: true, 
          path: '/' 
        });
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
      } catch (error) {
        console.error('Error de logout:', error);
        res.status(500).json({ message: 'Error interno del servidor', success: 'NOK', error: error.message });
      }
    }
};

module.exports = userController;
