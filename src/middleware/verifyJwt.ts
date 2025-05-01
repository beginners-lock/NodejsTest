import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyJwt(req: Request, res: Response, next: NextFunction){
    const authorization = req.headers['authorization'];
    //It is in this format Bearer <access_token>

    if(!authorization){ res.status(401).send({ 
        message: 'An access token must be sent in the header with the format Bearer <access_token>' }); return; 
    }

    const accessToken = authorization.split(' ')[1];
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN!, (error, decode)=>{
        if(error){
            res.status(403).send({ message: 'Expired token' });
            return;
        }

        next();
    });
}