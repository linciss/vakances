import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
const app = express();
import newsRouter from './routes/news.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import auth from './routes/auth.js';

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:8080'],
  })
);
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: process.env.DB_NAME,
    }),
  })
);

app.use('/api/news', newsRouter);
app.use('/api/auth', auth);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  });
