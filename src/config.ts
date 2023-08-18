import "dotenv/config";

const port = Number(process.env.PORT);
const frontendURL = process.env.FRONTEND_URL;

export { port, frontendURL };
