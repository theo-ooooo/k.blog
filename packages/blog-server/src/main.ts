import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
const port = +process.env.PORT! || 8888;

app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ result: true });
});

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
});
