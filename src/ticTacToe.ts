import _ from "lodash";
import { InitGame } from "./game";

export class TicTacToe extends InitGame {
  constructor(gameRoomName: string, maxPlayers: number) {
    super(gameRoomName, maxPlayers);
  }
  setFirstPlayer() {
    this.currentPlayerID = _.sample(this.playerIDs) || "";
  }

  initGame() {
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
    return this.getWinner() !== null;
  }
  getWinner() {
    const { board } = this.data;
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== null &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
      if (
        board[0][i] !== null &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }
    if (
      board[0][0] !== null &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] !== null &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }
    if (board.flat().every((cell: any) => cell !== null)) {
      return "draw";
    }
    return null;
  }
  isMoveValid(move: any): boolean {
    const { row, col } = move;
    return this.data.board[row][col] === null;
  }
  makeMove(move: any) {
    const { row, col } = move;
    const currentPlayerSymbol =
      this.currentPlayerID === this.playerIDs[0] ? "X" : "O";
    if (this.data.board[row][col] === null) {
      this.data.board[row][col] = currentPlayerSymbol;
      if (this.isGameEnded()) {
        if (this.getWinner() === "draw") {
          this.winnerID = "";
        } else {
          this.winnerID = this.currentPlayerID;
        }
        this.status = "ended";
      }
      this.currentPlayerID =
        this.currentPlayerID === this.playerIDs[0]
          ? this.playerIDs[1]
          : this.playerIDs[0];
    }
  }
}
