'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/route.auth.js';

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use(authRouter);
