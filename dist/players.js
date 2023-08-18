"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerGameRoom = exports.getGameRoomPlayers = exports.getPlayer = exports.removePlayer = exports.createPlayer = exports.getAllPlayers = void 0;
const rooms_1 = require("./rooms");
const players = new Map();
function getAllPlayers() {
    return [...players.values()];
}
exports.getAllPlayers = getAllPlayers;
function createPlayer(playerID, playerName) {
    const player = {
        id: playerID,
        name: playerName,
    };
    players.set(playerID, player);
    return player;
}
exports.createPlayer = createPlayer;
function removePlayer(playerID) {
    players.delete(playerID);
}
exports.removePlayer = removePlayer;
function getPlayer(playerID) {
    return players.get(playerID);
}
exports.getPlayer = getPlayer;
function getGameRoomPlayers(gameRoom) {
    return gameRoom.playerIDs.map((playerID) => {
        return players.get(playerID);
    });
}
exports.getGameRoomPlayers = getGameRoomPlayers;
function getPlayerGameRoom(playerID) {
    return (0, rooms_1.getAllGameRooms)().find((gameRoom) => gameRoom.playerIDs.includes(playerID));
}
exports.getPlayerGameRoom = getPlayerGameRoom;
