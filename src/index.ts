'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/route.auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use(authRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Go to URL: ${process.env.CLIENT_URL}`);
});
