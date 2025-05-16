const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken(), gameController.getGameController);

router.post('/', verifyToken(), gameController.createGame);

router.put('/:id', verifyToken(), gameController.updateGame);

router.delete('/:id', verifyToken(), gameController.deleteGame);

router.get('/admin/all', verifyToken(['administrador']), gameController.getAllGamesController);

router.delete('/admin/:id', verifyToken(['administrador']), gameController.adminDeleteGameController);

module.exports = router; 