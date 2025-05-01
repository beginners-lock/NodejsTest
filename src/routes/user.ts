import express from 'express';
import { signin } from '../controllers/auth/signin';
import { register } from '../controllers/auth/register';

export const userRouter = express.Router();

userRouter.post('/auth/signin', signin);
userRouter.post('/auth/register', register);