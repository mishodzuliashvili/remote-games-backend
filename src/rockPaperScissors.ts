import _ from "lodash";
import { InitGame } from "./game";

enum Move {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
}

export class RockPaperScissors extends InitGame {
  constructor(gameRoomName: string, maxPlayers: number) {
    super(gameRoomName, maxPlayers);
  }

  setFirstPlayer() {
    this.currentPlayerID = _.sample(this.playerIDs) || "";
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
    if (!this.isGameEnded()) {
      return null;
    }

    const playerMoves = Object.entries(this.data.moves);

    console.log(playerMoves);
    if (
      playerMoves.every(([_, move]) => move === Move.Rock) ||
      playerMoves.every(([_, move]) => move === Move.Paper) ||
      playerMoves.every(([_, move]) => move === Move.Scissors)
    ) {
      return null;
    }

    const winningMoves = {
      [Move.Rock]: Move.Scissors,
      [Move.Paper]: Move.Rock,
      [Move.Scissors]: Move.Paper,
    };

    const winningPlayerID = playerMoves.find(([playerID, move]) => {
      const otherPlayerMoves = playerMoves.filter(
        ([otherID]) => otherID !== playerID
      );
      return otherPlayerMoves.every(
        ([_, otherMove]) => otherMove === winningMoves[move as Move]
      );
    })?.[0];
    return winningPlayerID || null;
  }

  isMoveValid(move: any): boolean {
    return Object.values(Move).includes(move);
  }

  makeMove(move: any) {
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
