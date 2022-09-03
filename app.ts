require('dotenv').config()
import express from 'express';
import { json } from 'body-parser';
import "reflect-metadata";
import cors from "cors";

import routes from './src/Routes'
import errorMiddleware from "./src/middleware/ErrorMiddleware";

const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use(routes);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log( `Server started at <http://localhost>:${port}` );
});