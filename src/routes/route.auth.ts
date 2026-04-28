import { Router } from 'express';
import { authController } from '../controllers/route.controller.js';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
