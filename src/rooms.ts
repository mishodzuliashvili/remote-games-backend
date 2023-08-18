import uniqID from "uniqid";
import { createInitGame } from "./games";

const rooms: Map<string, GameRoom> = new Map();
const roomsSecretData: Map<string, any> = new Map();

export function getAllGameRooms(): GameRoom[] {
  return [...rooms.values()];
}

export function createGameRoom(gameRoomName: string): GameRoom {
  const gameRoom: GameRoom = createInitGame(gameRoomName);
  roomsSecretData.set(gameRoom.id, {});
  rooms.set(gameRoom.id, gameRoom);
  return gameRoom;
}

export function removeGameRoom(gameRoom: GameRoom): void {
  rooms.delete(gameRoom.id);
  roomsSecretData.delete(gameRoom.id);
}

export function isGameRoomFull(gameRoom: GameRoom): boolean {
  return gameRoom.playerIDs.length >= gameRoom.maxPlayers;
}

export function getVacantGameRoom(gameRoomName: string): GameRoom {
  return getAllGameRooms().find(
    (gameRoom) => gameRoom.name === gameRoomName && !isGameRoomFull(gameRoom)
  ) as GameRoom;
}
