import { Request, Response } from 'express';
import { emitError } from '../../emitters/errorEmitter';
import { updateUsers } from '../../utils/updateUsers';
import data from './../../models/users.json';
import bcrypt from 'bcrypt';
import { User } from '../../types';

export function signin(req: Request, res: Response){
    try{
        const { email, password } = req.body;
        const users = data as User[];

        if(!email){ res.status(401).send({ message: 'User email must be provided' }); return; }
        if(!password){ res.status(401).send({ message: 'User password must be provided' }); return; }

        const user = users.find(user => user.email===email);

        if(!user){ res.status(401).send({ message: 'No user exists with this email' }); return; }

        const accurate = bcrypt.compareSync(password, user.password);

        if(accurate){
            res.status(200).send({message: 'success'});
        }else{
            res.status(401).send({message: 'Wrong credentials'});
        }
   }catch(error){
        console.log(error);
        emitError(error as string, req.url, req.method, req.headers.origin);
        res.status(500);
    }
}