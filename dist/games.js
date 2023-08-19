"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitGame = void 0;
const rockPaperScissors_1 = require("./rockPaperScissors");
const ticTacToe_1 = require("./ticTacToe");
function createInitGame(gameRoomName) {
    if (gameRoomName === "Tic Tac Toe") {
        return new ticTacToe_1.TicTacToe(gameRoomName, 2);
    }
    else if (gameRoomName === "Rock Paper Scissors") {
        return new rockPaperScissors_1.RockPaperScissors(gameRoomName, 2);
    }
    return new ticTacToe_1.TicTacToe(gameRoomName, 2);
}
exports.createInitGame = createInitGame;
