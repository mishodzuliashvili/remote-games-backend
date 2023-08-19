import { getAllGameRooms } from "./rooms";

const players: Map<string, Player> = new Map();

export function getAllPlayers(): Player[] {
  return [...players.values()];
}

export function createPlayer(playerID: string, playerName: string): Player {
  const player: Player = {
    id: playerID,
    name: playerName,
  };
  players.set(playerID, player);
  return player;
}
export function removePlayer(playerID: string): void {
  players.delete(playerID);
}

export function getPlayer(playerID: string): Player {
  return players.get(playerID) as Player;
}

export function getGameRoomPlayers(gameRoom: GameRoom): Player[] {
  return (
    gameRoom.playerIDs.map((playerID) => {
      return players.get(playerID) || { id: playerID, name: "Unknown" };
    }) || []
  );
}

export function getPlayerGameRoom(playerID: string): GameRoom {
  return getAllGameRooms().find((gameRoom) =>
    gameRoom.playerIDs.includes(playerID)
  ) as GameRoom;
}
