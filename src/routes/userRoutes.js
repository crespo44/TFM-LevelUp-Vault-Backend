const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', userController.loginDataUser);
router.get('/verify-token', verifyToken());
router.post('/logout', userController.logoutUser);

router.get('/', verifyToken(['administrador']), userController.getUserController);

router.get("/search", verifyToken(['administrador']), userController.searchUsersController);

router.get('/:id', verifyToken(), userController.getUserControllerById);

router.post('/', userController.createUser);

router.put('/:id', verifyToken(['administrador']), userController.updateUser);

router.delete('/:id', verifyToken(['administrador']), userController.deleteUser);


module.exports = router; 