"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendURL = exports.port = void 0;
require("dotenv/config");
const port = Number(process.env.PORT);
exports.port = port;
const frontendURL = process.env.FRONTEND_URL;
exports.frontendURL = frontendURL;
