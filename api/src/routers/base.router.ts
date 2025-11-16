import { Router } from 'express';
import {
  baseController,
  healthController,
} from '@/controllers/base.controller.js';

const router = Router();

router.get('/', baseController);

router.get('/health', healthController);

export { router as baseRouter };
