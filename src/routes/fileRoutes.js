const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/download/:gameId/:filename', verifyToken(), fileController.downloadGameImage);;
router.get('/list/:gameId', verifyToken(), fileController.listGameImages);
router.post('/upload/:gameId', verifyToken(), upload.single('file'), fileController.uploadGameImage);
router.delete('/delete/:gameId/:filename', verifyToken(), fileController.deleteGameImage);

module.exports = router; 