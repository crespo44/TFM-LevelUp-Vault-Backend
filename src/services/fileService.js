const fs = require('fs').promises;
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

async function iniUploadDirectory(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

async function uploadFile(file, gameId) {
    const userGamePath = path.join(uploadDir, `game_${gameId}`)
    await iniUploadDirectory(userGamePath);
    const filePath = path.join(userGamePath, file.originalname);
    await fs.writeFile(filePath, file.buffer);
    return `game_${gameId}/${file.originalname}`;;
}

function downloadFile(gameId, filename) {
    return path.resolve(__dirname, '../../uploads', `game_${gameId}`, filename);
}

async function listFiles(gameId) {
    const userGamePath = path.join(uploadDir, `game_${gameId}`);
    try {
        await fs.access(userGamePath);
        return await fs.readdir(userGamePath);
    } catch {
        return [];
    }
}

async function deleteFile(gameId, filename) {
    const filePath = path.join(uploadDir, `game_${gameId}`, filename);
    await fs.unlink(filePath);
}


iniUploadDirectory(uploadDir);

module.exports = {
    uploadFile,
    downloadFile,
    listFiles,
    deleteFile
}; 