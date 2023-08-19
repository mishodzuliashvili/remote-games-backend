"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RockPaperScissors = void 0;
const lodash_1 = __importDefault(require("lodash"));
const game_1 = require("./game");
var Move;
(function (Move) {
    Move["Rock"] = "rock";
    Move["Paper"] = "paper";
    Move["Scissors"] = "scissors";
})(Move || (Move = {}));
class RockPaperScissors extends game_1.InitGame {
    constructor(gameRoomName, maxPlayers) {
        super(gameRoomName, maxPlayers);
    }
    setFirstPlayer() {
        this.currentPlayerID = lodash_1.default.sample(this.playerIDs) || "";
    }
    initGame() {
        this.data = {
            moves: {},
        };
    }
    isGameEnded() {
        return Object.values(this.data.moves).length === this.playerIDs.length;
    }
    getWinner() {
        var _a;
        if (!this.isGameEnded()) {
            return null;
        }
        const playerMoves = Object.entries(this.data.moves);
        console.log(playerMoves);
        if (playerMoves.every(([_, move]) => move === Move.Rock) ||
            playerMoves.every(([_, move]) => move === Move.Paper) ||
            playerMoves.every(([_, move]) => move === Move.Scissors)) {
            return null;
        }
        const winningMoves = {
            [Move.Rock]: Move.Scissors,
            [Move.Paper]: Move.Rock,
            [Move.Scissors]: Move.Paper,
        };
        const winningPlayerID = (_a = playerMoves.find(([playerID, move]) => {
            const otherPlayerMoves = playerMoves.filter(([otherID]) => otherID !== playerID);
            return otherPlayerMoves.every(([_, otherMove]) => otherMove === winningMoves[move]);
        })) === null || _a === void 0 ? void 0 : _a[0];
        return winningPlayerID || null;
    }
    isMoveValid(move) {
        return Object.values(Move).includes(move);
    }
    makeMove(move) {
        if (this.isMoveValid(move)) {
            this.data.moves[this.currentPlayerID] = move;
            if (this.isGameEnded()) {
                this.winnerID = this.getWinner() || "";
                this.status = "ended";
            }
            this.currentPlayerID =
                this.playerIDs.find((playerID) => !this.data.moves[playerID]) || "";
        }
    }
}
exports.RockPaperScissors = RockPaperScissors;
