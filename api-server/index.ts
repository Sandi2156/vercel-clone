import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import config from "./config/common";
import router from "./routes";
import startupInitialize from "./startup";

/* express app initialization */
const app = express();
const server = http.createServer(app);

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

/* use express router */
app.use(router);

/* creation of socket server */
const io = new Server(server, {
  cors: "*" as any,
});

/* run startup initializer */
startupInitialize(io);

const PORT = process.env.PORT || config.PORT;
server.listen(PORT, () =>
  console.log(`Api server is listening on port ${PORT}`)
);
