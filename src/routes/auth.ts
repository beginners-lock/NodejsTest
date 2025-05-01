import express from 'express';
import { signin } from '../controllers/auth/signin';
import { register } from '../controllers/auth/register';

export const authRouter = express.Router();

authRouter.post('/signin', signin);
authRouter.post('/register', register);