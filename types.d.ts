type Player = {
  id: string;
  name: string;
};

type Game = {
  players: Player[];
  gameRoom: GameRoom;
};

type GameRoom = {
  id: string;
  name: string;
  status: "loading" | "started" | "ended";
  winnerID: string;
  playerIDs: string[];
  maxPlayers: number;
  data: any;
  currentPlayerID: string;
  startGame: () => void;
  makeMove: (move: any) => void;
  isMoveValid: (move: any) => boolean;
};

type ServerMessage = {
  content: string;
  type: "info" | "success" | "warning" | "error" | "default";
};
