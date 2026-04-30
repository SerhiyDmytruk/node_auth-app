import { Router } from 'express';
import { meController } from '../controllers/meController.js';

export const meRouter = Router();

meRouter.get('/login', meController.me);
