import express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import cookieParser from 'cookie-parser';
import apiV1Routes from './routes/index';
import handleError from './middlewares/handleError';
import apiError from './libs/apiError';

dotenv.config();
const port = +process.env.PORT! || 8888;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors.default());

app.use('/api/v1', apiV1Routes);

app.use('/health', (req: express.Request, res: express.Response) => {
  res.json({ result: true });
});

app.use(() => {
  throw new apiError(404, `not found`);
});

app.use(handleError);

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
});
