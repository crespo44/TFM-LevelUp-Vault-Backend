const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    genre: {
        type: [String],
        enum: [
        'Acción', 'Aventura', 'RPG', 'Shooter', 'Puzzle',
        'Platformas', 'Estrategia', 'Depportes', 'Carreras', 'Simulacion',
        'Lucha', 'Terror', 'Survival', 'MMO', 'Sandbox'
        ],
        required: true
    },
    platform: { 
        type: [String],
        enum: [
        'PC', 'PlayStation', 'PS2', 'PS3', 'PS4', 'PS5',
        'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X',
        'Switch', 'Nintendo DS', 'Nintendo 3DS', 'Wii', 'Wii U',
        'Android', 'iOS', 'Mac', 'Linux', 'Other'
        ],
        required: true 
    },
    status: {
        type: String,
        required: true,
        enum:['No jugado', 'Jugando', 'Finalizado'],
        default: 'No jugado'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    notes: { 
        type: String 
    },
    rawgImage: { 
        type: String 
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    userName:{
        type: String,
        require: true
    },

    lastUpdate: {
        type: Date,
        required: true,
        default: Date.now
    },
});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game; 