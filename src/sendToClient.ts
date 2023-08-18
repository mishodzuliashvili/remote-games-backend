import { Socket } from "socket.io";
import Websocket from "./websocket";
import { getGameRoomPlayers } from "./players";

export function sendPlayerToClient(socket: Socket, player: Player) {
  socket.emit("player-got", player);
}

export function sendMessageToClient(
  socket: Socket,
  messageContent: string,
  messageType: ServerMessage["type"] = "default"
) {
  socket.emit("message-got", { content: messageContent, type: messageType });
}

export function sendMessageToGameRoom(
  io: Websocket,
  gameRoom: GameRoom,
  messageContent: string,
  messageType: ServerMessage["type"] = "default"
) {
  io.to(gameRoom.id).emit("message-got", {
    content: messageContent,
    type: messageType,
  });
}

export function sendGameToRoom(io: Websocket, gameRoom: GameRoom) {
  io.to(gameRoom.id).emit("game-got", {
    gameRoom,
    players: getGameRoomPlayers(gameRoom),
  });
}
