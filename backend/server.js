import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
const app = express();
import newsRouter from './routes/news.js';
import mongoose from 'mongoose';

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(helmet());

app.use('/api/news', newsRouter);

app.get('/', async (req, res) => {});

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  });
