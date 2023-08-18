"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
const lodash_1 = __importDefault(require("lodash"));
const sendToClient_1 = require("./sendToClient");
const players_1 = require("./players");
const rooms_1 = require("./rooms");
const io = websocket_1.default.getInstance();
io.on("connection", (socket) => {
    const playerID = socket.id;
    socket.on("join-playground", ({ playerName }) => {
        const player = (0, players_1.createPlayer)(playerID, playerName);
        (0, sendToClient_1.sendPlayerToClient)(socket, player);
        (0, sendToClient_1.sendMessageToClient)(socket, `👋 Welcome ${playerName}!`);
    });
    socket.on("leave-playground", () => {
        (0, players_1.removePlayer)(playerID);
        (0, sendToClient_1.sendMessageToClient)(socket, `👋 Goodbye!`);
    });
    socket.on("join-game-room", ({ gameRoomName }) => {
        let gameRoom = (0, rooms_1.getVacantGameRoom)(gameRoomName);
        if (!gameRoom) {
            gameRoom = (0, rooms_1.createGameRoom)(gameRoomName);
        }
        gameRoom.playerIDs.push(playerID);
        socket.join(gameRoom.id);
        if ((0, rooms_1.isGameRoomFull)(gameRoom)) {
            gameRoom.startGame();
        }
        (0, sendToClient_1.sendGameToRoom)(io, gameRoom);
        (0, sendToClient_1.sendMessageToClient)(socket, `👋 Welcome to ${gameRoomName}!`);
    });
    socket.on("leave-game-room", () => {
        const playerGameRoom = (0, players_1.getPlayerGameRoom)(playerID);
        socket.leave(playerGameRoom.id);
        (0, sendToClient_1.sendMessageToClient)(socket, `👋 Goodbye!`);
        (0, sendToClient_1.sendMessageToGameRoom)(io, playerGameRoom, `${(0, players_1.getPlayer)(playerID).name} left the game room`, "info");
        playerGameRoom.playerIDs = lodash_1.default.without(playerGameRoom.playerIDs, playerID);
        playerGameRoom.status = "loading";
        (0, sendToClient_1.sendGameToRoom)(io, playerGameRoom);
    });
    socket.on("make-move", ({ move }) => {
        const playerGameRoom = (0, players_1.getPlayerGameRoom)(playerID);
        if (playerGameRoom.currentPlayerID !== playerID) {
            (0, sendToClient_1.sendMessageToClient)(socket, `👋 It's not your turn!`);
            return;
        }
        if (!playerGameRoom.isMoveValid(move)) {
            (0, sendToClient_1.sendMessageToClient)(socket, `👋 Invalid move!`);
            return;
        }
        playerGameRoom.makeMove(move);
        (0, sendToClient_1.sendGameToRoom)(io, playerGameRoom);
    });
    socket.on("disconnect", () => {
        const playerGameRoom = (0, players_1.getPlayerGameRoom)(playerID);
        if (playerGameRoom) {
            const playerGameRoom = (0, players_1.getPlayerGameRoom)(playerID);
            (0, sendToClient_1.sendMessageToGameRoom)(io, playerGameRoom, `${(0, players_1.getPlayer)(playerID).name} left the game room`, "info");
            playerGameRoom.playerIDs = lodash_1.default.without(playerGameRoom.playerIDs, playerID);
            playerGameRoom.status = "loading";
            (0, sendToClient_1.sendGameToRoom)(io, playerGameRoom);
        }
        (0, players_1.removePlayer)(playerID);
    });
});
