import "reflect-metadata";
import express, { Request, Response, Router } from 'express';
import { json } from 'body-parser';
import routes from './src/routes'

const app = express();
const port = 3000

app.use(json());
app.use(routes);
app.listen(port, () => {
  console.log( `Server started at <http://localhost>:${port}` );
})