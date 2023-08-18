"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitGame = void 0;
const ticTacToe_1 = require("./ticTacToe");
function createInitGame(gameRoomName) {
    if (gameRoomName === "Tic Tac Toe") {
        return new ticTacToe_1.TicTacToe(gameRoomName, 2);
    }
    return {};
}
exports.createInitGame = createInitGame;
