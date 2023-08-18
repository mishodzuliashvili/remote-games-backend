"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const config_1 = require("./config");
const WEBSOCKET_CORS = {
    origin: config_1.frontendURL,
    methods: ["GET", "POST"],
};
class Websocket extends socket_io_1.Server {
    constructor() {
        super(config_1.port, {
            cors: WEBSOCKET_CORS,
        });
    }
    static getInstance() {
        if (!Websocket.io) {
            Websocket.io = new Websocket();
        }
        return Websocket.io;
    }
}
exports.default = Websocket;
