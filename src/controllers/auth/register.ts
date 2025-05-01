import { Request, Response } from 'express';
import { emitError } from '../../emitters/errorEmitter';
import data from './../../models/users.json';
import { User } from '../../types';
import bcrypt from 'bcrypt';
import { updateUsers } from '../../utils/updateUsers';

export function register(req: Request, res: Response){
    try{
        const { email, password } = req.body;
        const users = data as User[];

        if(!email){ res.status(401).send({ message: 'User email must be provided' }); return; }
        if(!password){ res.status(401).send({ message: 'User password must be provided' }); return; }

        const similarEmail = users.find(user => user.email===email);

        if(similarEmail){ res.status(401).send({ message: 'This email has a registered user' }); return; }

        const hashed = bcrypt.hashSync(password, 10);

        users.push({
            email,
            password: hashed,
            roles: 'User'
        });

        updateUsers(JSON.stringify(users, null, 2));

        res.status(200).send({message: 'success'});

    }catch(error){
        console.log(error);
        emitError(error as string, req.url, req.method, req.headers.origin);
        res.status(500);
    }
}