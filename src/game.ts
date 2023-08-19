import _ from "lodash";
import uniqID from "uniqid";

export abstract class InitGame {
  id: string;
  name: string;
  playerIDs: string[];
  currentPlayerID: string;
  winnerID: string;
  data: any;
  maxPlayers: number;
  status: "loading" | "started" | "ended";

  constructor(gameRoomName: string, maxPlayers: number) {
    this.id = uniqID();
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

  abstract setFirstPlayer(): void;

  abstract initGame(): void;

  abstract isGameEnded(): boolean;

  abstract getWinner(): string | null;

  abstract makeMove(move: any): void;

  abstract isMoveValid(move: any): boolean;
}
