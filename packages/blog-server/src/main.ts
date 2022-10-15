import express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import apiV1Routes from './routes/index';
import handleError from './middlewares/handleError';

dotenv.config();
const port = +process.env.PORT! || 8888;

const app = express();

app.use(express.json());
app.use(cors.default());

app.use('/api/v1', apiV1Routes);

app.use(handleError);

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
});
