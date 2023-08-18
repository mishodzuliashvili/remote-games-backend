import { Server } from "socket.io";
import { frontendURL, port } from "./config";

const WEBSOCKET_CORS = {
  origin: frontendURL,
  methods: ["GET", "POST"],
};

class Websocket extends Server {
  private static io: Websocket;

  constructor() {
    super(port, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket();
    }

    return Websocket.io;
  }
}

export default Websocket;
