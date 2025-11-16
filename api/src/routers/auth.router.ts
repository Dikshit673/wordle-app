import { sessionInit } from '@/controllers/auth.controller.js';
import { hmacAuth } from '@/middlewares/hmacAuth.js';
import { Router } from 'express';

const router = Router();

router.get('/init', hmacAuth, sessionInit);

export { router as authRouter };
