const Game = require('../models/Game');

async function insertGame(gameData, userId, userName) {
    try {
        gameData.userId = userId;
        gameData.userName = userName;
        const game = new Game(gameData);
        const res = await game.save();
        console.log('Juego insertado:', res);
        return res;
    } catch (err) {
        console.error('Error al insertar juego:', err);
        throw err;
    }
}

async function getGame() {
    try {
        const game = await Game.find();
        console.log('Juegos:', game);
        return game;
    } catch (err) {
        console.error('Error al obtener juegos:', err);
    }
}

async function getGamesByUser(userId, filters = {}) {
    try {
        const query = { userId };

        if (filters.title) {
            query.title = { $regex: filters.title, $options: 'i' };
        }
        if (filters.genre) {
            query.genre = { $regex: filters.genre, $options: 'i' };
        }
        if (filters.platform) {
            query.platform = { $regex: filters.platform, $options: 'i' };
        }
        if (filters.status) {
            query.status = filters.status;
        }
        const game = await Game.find(query);
        console.log('Juegos del usuario:', game);
        return game;
    } catch (err) {
        console.error('Error al obtener juegos del usuario:', err);
    }
}

async function updateGame(id, userId, gameData) {
    try {
        console.log("[UPDATE] Recibido:", { id, userId, gameData });

        const existingGame = await Game.findById(id);
        console.log("[UPDATE] Documento original:", existingGame);
        gameData.lastUpdate = new Date();
        
        const game = await Game.findOneAndUpdate(
            {_id: id, userId: userId},
            gameData,
            { 
                new: true,
                runValidators: true 
            }
            
        );

        if (!game) {
            throw new Error('Juego no encontrado o sin permisos');
        }

        console.log('Juego actualizado:', game);
        return game;
    } catch (err) {
        console.error('Error al actualizar juego:', err);
        throw err;
    }
}


async function deleteGame(id, userId) {
    try {
        const game = await Game.findOneAndDelete({ _id: id, userId: userId });
        
        if (!game) {
            throw new Error('Juego no encontrado o sin permisos');
        }

        console.log('Juego eliminado:', game);
        return game;
    } catch (err) {
        console.error('Error al eliminar juego:', err);
        throw err;
    }
}

async function getAllGames(filters={}) {
    try {
        const query = {};

        if (filters.title) {
            query.title = { $regex: filters.title, $options: 'i' };
        }
        if (filters.genre) {
            query.genre = { $regex: filters.genre, $options: 'i' };
        }
        if (filters.platform) {
            query.platform = { $regex: filters.platform, $options: 'i' };
        }
        if (filters.status) {
            query.status = filters.status;
        }
        if (filters.user) {
            query.userName = { $regex: filters.user, $options: 'i' };
        }
        const games = await Game.find(query);
        console.log('Todos los juegos:', games);
        return games;
    } catch (err) {
        console.error('Error al obtener todos los juegos:', err);
        throw err;
    }
}

async function adminDeleteGame(id) {
    try {
        const game = await Game.findByIdAndDelete(id);

        if (!game) {
            throw new Error('Juego no encontrado');
        }

        console.log('Juego eliminado por admin:', game);
        return game;
    } catch (err) {
        console.error('Error admin al eliminar juego:', err);
        throw err;
    }
}

module.exports = { insertGame, getGame, getGamesByUser, updateGame, deleteGame, getAllGames, adminDeleteGame };