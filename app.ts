import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import "reflect-metadata";

const app = express();
const port = 3000

app.use(json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})
app.listen(port, () => {
  console.log( `Server started at <http://localhost>:${port}` );
})