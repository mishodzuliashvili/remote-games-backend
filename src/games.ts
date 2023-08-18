import { TicTacToe } from "./ticTacToe";

export function createInitGame(gameRoomName: string) {
  if (gameRoomName === "Tic Tac Toe") {
    return new TicTacToe(gameRoomName, 2);
  }
  return {} as GameRoom;
}
