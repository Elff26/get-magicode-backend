require('dotenv').config()
import "reflect-metadata";

import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import cors from "cors";

import routes from './src/Routes'
import errorMiddleware from "./src/middleware/ErrorMiddleware";
import SocketIO from "./src/utils/SocketIO";


const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use(routes);
app.use(errorMiddleware);

const server = http.createServer(app);

const io = new SocketIO(server);
io.socketEvents();

server.listen(port, () => {
  console.log( `Server started at <http://localhost>:${port}` );
});