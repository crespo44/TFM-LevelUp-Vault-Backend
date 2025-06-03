const fileService = require('../services/FileService');
const path = require('path');
const fs = require('fs');

async function downloadGameImage(req, res) {
    try {
        const { gameId, filename } = req.params;
        const filePath = fileService.downloadFile(gameId, filename);

        // Confirmar que existe y es accesible
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Archivo no existe físicamente' });
        }

        // Enviar como archivo real
        res.sendFile(path.resolve(filePath), function(err) {
            if (err) {
                console.error('Error exacto de sendFile:', err.message);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error al enviar imagen' });
                }
            }
        });
    } catch (error) {
        console.error('Error global:', error.message);
        res.status(500).json({ error: 'Fallo inesperado' });
    }
}

async function uploadGameImage (req, res) {
    try {

        const gameId = req.params.gameId;

        if (!req.file) {
            return res.status(400).json({ error: 'No se a puesto ningún archivo' });
        }
        
        const filename = await fileService.uploadFile(req.file, gameId);
        res.status(201).json({ message: 'El archivo se ha subido exitosamente', filename });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error de subida de archivo' });
    }
}

async function listGameImages (req, res) {
    try {
        const gameId = req.params.gameId;
        const files = await fileService.listFiles( gameId );
        res.status(200).json({ files });;
    } catch (error) {
        console.error('Error al listar archivos:', error);
        res.status(500).json({ error: 'Error al listar los archivos' });
    }
}

async function deleteGameImage (req, res) {
    try {
        const gameId = req.params.gameId;
        const filename = req.params.filename;
        await fileService.deleteFile(gameId, filename);
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