const fileService = require('../services/FileService');

async function downloadGameImage(req, res) {
    try {
        const { gameId, filename } = req.params;

        const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/game_${gameId}/${filename}`;
        return res.redirect(cloudinaryUrl);
    } catch (error) {
        console.error('Error al redirigir a imagen:', error);
        res.status(500).json({ error: 'Error al redirigir imagen' });
    }
}

async function uploadGameImage (req, res) {
    try {

        const gameId = req.params.gameId;

        if (!req.file) {
            return res.status(400).json({ error: 'No se a puesto ningún archivo' });
        }
        
        const { url, publicId } = await fileService.uploadFile(req.file, gameId);
        res.status(201).json({
            message: 'El archivo se ha subido exitosamente',
            filename: req.file.originalname,
            url,
            publicId
        });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error de subida de archivo' });
    }
}

async function listGameImages (req, res) {
    try {
        const gameId = req.params.gameId;
        const files = await fileService.listFiles(gameId);
        res.status(200).json({ files });;
    } catch (error) {
        console.error('Error al listar archivos:', error);
        res.status(500).json({ error: 'Error al listar los archivos' });
    }
}

async function deleteGameImage(req, res) {
    try {
        const publicId = req.query.publicId;
        await fileService.deleteFile(publicId);
        res.status(200).json({ message: 'Archivo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        res.status(404).json({ error: 'Archivo no encontrado' });
    }
}

module.exports = {
    uploadGameImage,
    downloadGameImage,
    listGameImages,
    deleteGameImage
}; 