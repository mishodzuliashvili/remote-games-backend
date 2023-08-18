import Websocket from "./websocket";
import _ from "lodash";
import { Socket } from "socket.io";
import {
  sendGameToRoom,
  sendMessageToClient,
  sendMessageToGameRoom,
  sendPlayerToClient,
} from "./sendToClient";
import {
  createPlayer,
  getPlayer,
  getPlayerGameRoom,
  removePlayer,
} from "./players";
import { createGameRoom, getVacantGameRoom, isGameRoomFull } from "./rooms";

const io = Websocket.getInstance();

io.on("connection", (socket: Socket) => {
  const playerID: string = socket.id;

  socket.on("join-playground", ({ playerName }: { playerName: string }) => {
    const player = createPlayer(playerID, playerName);
    sendPlayerToClient(socket, player);
    sendMessageToClient(socket, `👋 Welcome ${playerName}!`);
  });

  socket.on("leave-playground", () => {
    removePlayer(playerID);
    sendMessageToClient(socket, `👋 Goodbye!`);
  });

  socket.on("join-game-room", ({ gameRoomName }: { gameRoomName: string }) => {
    let gameRoom = getVacantGameRoom(gameRoomName);
    if (!gameRoom) {
      gameRoom = createGameRoom(gameRoomName);
    }
    gameRoom.playerIDs.push(playerID);
    socket.join(gameRoom.id);
    if (isGameRoomFull(gameRoom)) {
      gameRoom.startGame();
    }
    sendGameToRoom(io, gameRoom);
    sendMessageToClient(socket, `👋 Welcome to ${gameRoomName}!`);
  });

  socket.on("leave-game-room", () => {
    const playerGameRoom = getPlayerGameRoom(playerID);
    socket.leave(playerGameRoom.id);
    sendMessageToClient(socket, `👋 Goodbye!`);
    sendMessageToGameRoom(
      io,
      playerGameRoom,
      `${getPlayer(playerID).name} left the game room`,
      "info"
    );
    playerGameRoom.playerIDs = _.without(playerGameRoom.playerIDs, playerID);
    playerGameRoom.status = "loading";
    sendGameToRoom(io, playerGameRoom);
  });

  socket.on("make-move", ({ move }: any) => {
    const playerGameRoom = getPlayerGameRoom(playerID);
    if (playerGameRoom.currentPlayerID !== playerID) {
      sendMessageToClient(socket, `👋 It's not your turn!`);
      return;
    }
    if (!playerGameRoom.isMoveValid(move)) {
      sendMessageToClient(socket, `👋 Invalid move!`);
      return;
    }
    playerGameRoom.makeMove(move);
    sendGameToRoom(io, playerGameRoom);
  });

  socket.on("disconnect", () => {
    const playerGameRoom = getPlayerGameRoom(playerID);
    if (playerGameRoom) {
      const playerGameRoom = getPlayerGameRoom(playerID);
      sendMessageToGameRoom(
        io,
        playerGameRoom,
        `${getPlayer(playerID).name} left the game room`,
        "info"
      );
      playerGameRoom.playerIDs = _.without(playerGameRoom.playerIDs, playerID);
      playerGameRoom.status = "loading";
      sendGameToRoom(io, playerGameRoom);
    }
    removePlayer(playerID);
  });
});
