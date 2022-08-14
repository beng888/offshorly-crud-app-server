import express, { ErrorRequestHandler } from 'express';
import connection from './db/config';
import cookieParser from 'cookie-parser';
import todosRouter from './routes/todos';
import usersRouter from './routes/users';
import dotenv from 'dotenv';
import guard from './middleware/guard';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLOUDFLARE_FRONTEND as string, process.env.NETLIFY_FRONTEND as string],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/todos', guard, todosRouter);
app.use('/api/users', usersRouter);

app.use(<ErrorRequestHandler>((err, req, res, next) => {
  if (err) return res.status(err.code ?? 500).send(err);
}));

connection
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });
