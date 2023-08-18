"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVacantGameRoom = exports.isGameRoomFull = exports.removeGameRoom = exports.createGameRoom = exports.getAllGameRooms = void 0;
const games_1 = require("./games");
const rooms = new Map();
const roomsSecretData = new Map();
function getAllGameRooms() {
    return [...rooms.values()];
}
exports.getAllGameRooms = getAllGameRooms;
function createGameRoom(gameRoomName) {
    const gameRoom = (0, games_1.createInitGame)(gameRoomName);
    roomsSecretData.set(gameRoom.id, {});
    rooms.set(gameRoom.id, gameRoom);
    return gameRoom;
}
exports.createGameRoom = createGameRoom;
function removeGameRoom(gameRoom) {
    rooms.delete(gameRoom.id);
    roomsSecretData.delete(gameRoom.id);
}
exports.removeGameRoom = removeGameRoom;
function isGameRoomFull(gameRoom) {
    return gameRoom.playerIDs.length >= gameRoom.maxPlayers;
}
exports.isGameRoomFull = isGameRoomFull;
function getVacantGameRoom(gameRoomName) {
    return getAllGameRooms().find((gameRoom) => gameRoom.name === gameRoomName && !isGameRoomFull(gameRoom));
}
exports.getVacantGameRoom = getVacantGameRoom;
