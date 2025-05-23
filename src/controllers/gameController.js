const { getGamesByUser, updateGame, insertGame, deleteGame, getAllGames, adminDeleteGame, } = require('../services/gameServices');
const { getGameValidations, createGameValidations, updateGameValidations, deleteGameValidations } = require('../validations/gameValidations');

const gameController = {
    getGameController: [
        ...getGameValidations,
        async (req, response) => {
            try {
                const userId = req.user.id;
                const userName = req.user.username;
                const data = await getGamesByUser(userId, userName);
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger juego de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger juego de la BBDD' });
            }
        }
    ],
    
    createGame: [
        ...createGameValidations,
        async (req, response) => {
            try {
                const userId = req.user.id;
                const userName = req.user.username;
                const newGame = await insertGame(req.body, userId, userName);
                response.status(201).json(newGame);
            } catch(e) {
                console.log('Error al crear juego', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateGame: [
        ...updateGameValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const gameData = req.body;
                const updatedGame = await updateGame(id, userId, gameData);
                response.status(200).json(updatedGame);
            } catch(e) {
                console.log('Error al actualizar juego', e);
                response.status(500).json({ error: 'Error al actualizar juego' });
            }
        }
    ],

    deleteGame: [
        ...deleteGameValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const deletedGame = await deleteGame(id, userId);
                response.status(200).json(deletedGame);
            } catch(e) {
                console.log('Error al borrar juego', e);
                response.status(500).json({ error: 'Error al borrar juego' });
            }
        }
    ],

    getAllGamesController: [
        ...getGameValidations,
        async (req, res) => {
            try {
                const data = await getAllGames();
                res.status(200).json(data);
            } catch (e) {
                console.log('Error al recoger todos los juegos (admin)', e);
                res.status(500).json({ error: 'Error al recoger todos los juegos' });
            }
        }
    ],

    adminDeleteGameController: [
        ...deleteGameValidations,
        async (req, res) => {
            try {
                const { id } = req.params;
                const deletedGame = await adminDeleteGame(id);
                res.status(200).json(deletedGame);
            } catch (e) {
                console.log('Error admin al borrar juego', e);
                res.status(500).json({ error: 'Error al borrar juego' });
            }
        }
    ],
};

module.exports = gameController;
