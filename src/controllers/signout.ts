import { Request, Response } from 'express';
import data from './../models/users.json';
import { User } from '../types';
import { updateUsers } from '../utils/updateUsers';

export function signout(req: Request, res: Response){
    const users = data as User[];
    const cookie = req.cookies;

    const refreshToken = cookie['jwt'];

    const userIndex = users.findIndex(user => user.refreshToken===refreshToken);

    if(userIndex===-1){ res.status(200).send({ message: 'success' }); return; } //No refresh token to remove

    delete users[userIndex].refreshToken;
    updateUsers(JSON.stringify(users, null, 2));
    res.status(200).send({ message: 'success' });
}