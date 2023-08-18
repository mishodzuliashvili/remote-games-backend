"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = void 0;
const lodash_1 = __importDefault(require("lodash"));
const game_1 = require("../game");
class TicTacToe extends game_1.InitGame {
    setFirstPlayer() {
        this.currentPlayerID = lodash_1.default.sample(this.playerIDs) || "";
    }
    initGame() {
        // set tic-tac-toe board
        const board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.data = {
            board,
        };
    }
    isGameEnded() {
        // game is ended if somone won
        return this.getWinner() !== null;
    }
    getWinner() {
        // get winner in
        const { board } = this.data;
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== null &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                return board[i][0];
            }
            if (board[0][i] !== null &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]) {
                return board[0][i];
            }
        }
        if (board[0][0] !== null &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] !== null &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]) {
            return board[0][2];
        }
        // Check if the board is full (draw)
        if (board.flat().every((cell) => cell !== null)) {
            return "draw";
        }
        return null;
    }
    isMoveValid(move) {
        const { row, col } = move;
        // Check if the cell is empty
        return this.data.board[row][col] === null;
    }
    makeMove(move) {
        const { row, col } = move;
        const currentPlayerSymbol = this.currentPlayerID === this.playerIDs[0] ? "X" : "O";
        // Check if the cell is empty before making a move
        if (this.data.board[row][col] === null) {
            this.data.board[row][col] = currentPlayerSymbol;
            // Check if the game has ended after the move
            if (this.isGameEnded()) {
                if (this.getWinner() === "draw") {
                    this.winnerID = "";
                }
                else {
                    this.winnerID = this.currentPlayerID;
                }
                this.status = "ended";
            }
            // Switch to the next player
            this.currentPlayerID =
                this.currentPlayerID === this.playerIDs[0]
                    ? this.playerIDs[1]
                    : this.playerIDs[0];
        }
    }
}
exports.TicTacToe = TicTacToe;
