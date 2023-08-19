import { RockPaperScissors } from "./rockPaperScissors";
import { TicTacToe } from "./ticTacToe";

export function createInitGame(gameRoomName: string) {
  if (gameRoomName === "Tic Tac Toe") {
    return new TicTacToe(gameRoomName, 2);
  } else if (gameRoomName === "Rock Paper Scissors") {
    return new RockPaperScissors(gameRoomName, 2);
  }
  return new TicTacToe(gameRoomName, 2);
}
