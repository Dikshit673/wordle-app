import express from 'express';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import { EnvVars } from './utils/EnvVars.js';
import { wordRouter } from './routers/word.router.js';
import { baseRouter } from './routers/base.router.js';
import { authRouter } from './routers/auth.router.js';
import cookieParser from 'cookie-parser';

const { PORT, CLIENT_URL } = EnvVars;
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: 'Too many requests',
});

const app = express();

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET'],
    credentials: true,
  })
);

// routes
app.use(baseRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/word', wordRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
