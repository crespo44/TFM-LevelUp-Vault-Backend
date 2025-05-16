const fileService = require('../services/FileService');


async function downloadGameImage (req, res) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;
        const filename = req.params.filename;
        const fileBuffer = await fileService.downloadFile(userId, gameId, filename);
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.send(fileBuffer);
    } catch (error) {
        console.error('Error al descargar archivo:', error);
        res.status(404).json({ error: 'Archivo no encontrado' });
    }
}

async function uploadGameImage (req, res) {
    try {

        const userId = req.user.id;
        const gameId = req.params.gameId;

        if (!req.file) {
            return res.status(400).json({ error: 'No se a puesto ningún archivo' });
        }

        const filename = await fileService.uploadFile(req.file, userId, gameId);
        res.status(201).json({ message: 'El archivo se ha subido exitosamente', filename });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error de subida de archivo' });
    }
}

async function listGameImages (req, res) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;
        const files = await fileService.listFiles(userId, gameId);
        res.status(200).json({ files });;
    } catch (error) {
        console.error('Error al listar archivos:', error);
        res.status(500).json({ error: 'Error al listar los archivos' });
    }
}

async function deleteGameImage (req, res) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;
        const filename = req.params.filename;
        await fileService.deleteFile(userId, gameId, filename);
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