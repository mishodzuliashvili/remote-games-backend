"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGameToRoom = exports.sendMessageToGameRoom = exports.sendMessageToClient = exports.sendPlayerToClient = void 0;
const players_1 = require("./players");
function sendPlayerToClient(socket, player) {
    socket.emit("player-got", player);
}
exports.sendPlayerToClient = sendPlayerToClient;
function sendMessageToClient(socket, messageContent, messageType = "default") {
    socket.emit("message-got", { content: messageContent, type: messageType });
}
exports.sendMessageToClient = sendMessageToClient;
function sendMessageToGameRoom(io, gameRoom, messageContent, messageType = "default") {
    io.to(gameRoom.id).emit("message-got", {
        content: messageContent,
        type: messageType,
    });
}
exports.sendMessageToGameRoom = sendMessageToGameRoom;
function sendGameToRoom(io, gameRoom) {
    io.to(gameRoom.id).emit("game-got", {
        gameRoom,
        players: (0, players_1.getGameRoomPlayers)(gameRoom),
    });
}
exports.sendGameToRoom = sendGameToRoom;
