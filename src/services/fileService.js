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

async function uploadFile( userId, gameId ) {
    const userGamePath = path.join(uploadDir, `user_${userId}`, `game_${gameId}`)
    await iniUploadDirectory(userGamePath);
    return await fs.readdir(userGamePath);;
}

async function downloadFile(userId, gameId, filename) {
    const filePath = path.join(uploadDir, `user_${userId}`, `game_${gameId}`, filename);
    return await fs.readFile(filePath);
}

async function listFiles(userId, gameId) {
    const userGamePath = path.join(uploadDir, `user_${userId}`, `game_${gameId}`);
    await iniUploadDirectory(userGamePath);
    return await fs.readdir(userGamePath);
}

async function deleteFile(filename) {
    const filePath = path.join(uploadDir, `user_${userId}`, `game_${gameId}`, filename);
    await fs.unlink(filePath);
}


iniUploadDirectory(uploadDir);

module.exports = {
    uploadFile,
    downloadFile,
    listFiles,
    deleteFile
}; 