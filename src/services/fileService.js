const cloudinary = require('../config/configCloudinary');

const uploadedImages = {};

async function uploadFile(file, gameId) {
    try {
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
            folder: `game_${gameId}`,
            public_id: file.originalname
        });

        if (!uploadedImages[gameId]) {
            uploadedImages[gameId] = [];
        }
        uploadedImages[gameId].push({url: result.secure_url, publicId: result.public_id});

        return { url: result.secure_url, publicId: result.public_id };
    } catch (error) {
        console.error('❌ Error al subir imagen:', error);
        throw error;
    }
}

function downloadFile(gameId, filename) {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/game_${gameId}/${filename}`;
}

async function listFiles(gameId) {
    try {
        const folder = `game_${gameId}`;
        const result = await cloudinary.search
            .expression(`folder:${folder}`)
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();

        return result.resources.map(file => ({
            url: file.secure_url,
            publicId: file.public_id
        }));
    } catch (error) {
        console.error('Error al listar archivos en Cloudinary:', error);
        return [];
    }
}


async function deleteFile(publicId) {
    await cloudinary.uploader.destroy(publicId);
    const gameId = extractGameId(publicId);
    if (gameId && uploadedImages[gameId]) {
        uploadedImages[gameId] = uploadedImages[gameId].filter(file => file.publicId !== publicId);
    }
}

function extractGameId(publicId) {
    const match = publicId.match(/^game_(.+?)\//);;
    return match ? match[1] : null;
}

module.exports = {
    uploadFile,
    downloadFile,
    listFiles,
    deleteFile
};