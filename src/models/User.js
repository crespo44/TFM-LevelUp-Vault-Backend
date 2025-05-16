const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'La constraseña debe tener una longitud minima de 8 carácteres']
    },
    rol: {
        type: String,
        required: true,
        enum:['administrador', 'usuario'],
        default: 'usuario'
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        required: true,
        default: Date.now
    },
});



const Users = mongoose.model('Users', userSchema); 

module.exports = Users; 