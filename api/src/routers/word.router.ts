import { Router } from 'express';
import { getWord } from '@/controllers/word.controller.js';
import { sessionAuth } from '@/middlewares/sessionAuth.js';

const router = Router();

router.get('/', sessionAuth, getWord);

export { router as wordRouter };
