const User = require('../models/User');
const Game = require('../models/Game'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

async function insertUser(userData) {
    try {
        const { username, password, rol, ...anotherDatas } = userData;
        const availableUser = await User.findOne({ username });
        if (availableUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...anotherDatas,
            username:username,
            password:hashedPassword, 
            rol:rol || 'usuario',
        });
        const res = await user.save();
        console.log('Usuario insertado:', res);
        return res;
    } catch (err) {
        console.error('Error al insertar usuario:', err);
        throw err;
    }
}


async function getUsers() {
    try {
        const user = await User.find();
        console.log('Usuarios:', user);
        return user;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
}

async function searchUsers(name, username, email, rol) {
  try {
    const query = {};
    if (name) query.name = name;
    if (username) query.username = username;
    if (email) query.email = email;
    if (rol) query.rol = rol;

    const result = await User.find(query);
    console.log("Resultados búsqueda:", result);
    return result;
  } catch (error) {
    console.error("Error en búsqueda:", error);
    throw error;
  }
}

async function getUsersById(id) {
    try {
        const user = await User.findById(id);
        console.log('Usuarios:', user);
        return user;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
}


async function updateUser(id, userData) {
    try {
        
        const updateFields = { ...userData };

        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            updateFields.password = hashedPassword;
        }
        updateFields.lastUpdate = new Date();
        
        const user = await User.findByIdAndUpdate(
            id,
            updateFields,
            { 
                new: true,
                runValidators: true 
            }
        );

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        console.log('Usuario actualizado:', user);
        return user;
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        throw err;
    }
}


async function deleteUser(id) {
    try {
        await Game.deleteMany({ userId: id });
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        console.log('Usuario eliminado:', user);
        return user;
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        throw err;
    }
}

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Contraseña incorrecta');
    }
  
    const token = jwt.sign({ id: user._id, username: user.username, rol: user.rol }, SECRET_KEY, { expiresIn: '1h' });
  
    return {token, user};
  }

module.exports = { 
    insertUser, 
    getUsers,
    searchUsers,
    getUsersById, 
    updateUser, 
    deleteUser,
    loginUser,
};