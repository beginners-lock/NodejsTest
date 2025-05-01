import { Request, Response } from 'express';
import { emitError } from '../../emitters/errorEmitter';
import data from './../../models/users.json';
import bcrypt from 'bcrypt';
import { User } from '../../types';
import { createKeys } from '../../utils/createKeys';
import { updateUsers } from '../../utils/updateUsers';

export function signin(req: Request, res: Response){
    try{
        const { email, password } = req.body;
        const users = data as User[];

        if(!email){ res.status(401).send({ message: 'User email must be provided' }); return; }
        if(!password){ res.status(401).send({ message: 'User password must be provided' }); return; }

        const userIndex = users.findIndex(user => user.email===email);

        if(userIndex===-1){ res.status(401).send({ message: 'No user exists with this email' }); return; }

        const accurate = bcrypt.compareSync(password, users[userIndex].password);

        if(accurate){
            const { accessToken, refreshToken } = createKeys(users[userIndex].email);

            //Add refresh token to the user
            users[userIndex] = { ...users[userIndex], refreshToken: refreshToken };
            updateUsers(JSON.stringify(users, null, 2));

            res.cookie('jwt', refreshToken, { maxAge: 7*24*60*60, secure: true, httpOnly: true, sameSite: "none" });
            res.status(200).send({message: 'success', accessToken});
        }else{
            res.status(401).send({message: 'Wrong credentials'});
        }
   }catch(error){
        console.log(error);
        emitError(error as string, req.url, req.method, req.headers.origin);
        res.status(500);
    }
}