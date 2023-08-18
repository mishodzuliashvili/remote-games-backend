"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitGame = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
class InitGame {
    constructor(gameRoomName, maxPlayers) {
        this.id = (0, uniqid_1.default)();
        this.name = gameRoomName;
        this.playerIDs = [];
        this.currentPlayerID = "";
        this.winnerID = "";
        this.data = {};
        this.maxPlayers = maxPlayers;
        this.status = "loading";
    }
    startGame() {
        this.setFirstPlayer();
        this.initGame();
        this.status = "started";
    }
}
exports.InitGame = InitGame;
