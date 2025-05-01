import { Request, Response } from 'express';
import data from './../models/users.json';
import jwt from 'jsonwebtoken';
import { User } from '../types';

export function renewToken(req: Request, res: Response){
    const users = data as User[];
    const cookie = req.cookies;

    const refreshToken = cookie['jwt'];

    const user = users.find(user => user.refreshToken===refreshToken);

    if(!user){ res.status(200).send({ message: 'Unable to renew token. Please try signing in again' }); return; }

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN!, { expiresIn: '60s' });

    res.status(200).send({ message:'success' , accessToken });
}