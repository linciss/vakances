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
import ExpressMongoSanitize from 'express-mongo-sanitize';
import vacancy from './routes/vacancy.js';
import user from './routes/users.js';
import application from './routes/applications.js';
import file from './routes/files.js';
import mailer from './routes/mail.js';

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8080',
      'https://scaling-zebra-5gvq4455546h4747-5173.app.github.dev',
    ],
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
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(
  ExpressMongoSanitize({
    replaceWith: '_',
  })
);

app.use(`${process.env.prefix}/news`, newsRouter);
app.use(`${process.env.prefix}/auth`, auth);
app.use(`${process.env.prefix}/vacancies`, vacancy);
app.use(`${process.env.prefix}/applications`, application);
app.use(`${process.env.prefix}/users`, user);
app.use(`${process.env.prefix}/files`, file);
app.use(`${process.env.prefix}/mail`, mailer);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    app.listen(process.env.PORT || 6969, () => {
      console.log(`Server is running on port ${process.env.PORT || 6969}`);
    });
  });
