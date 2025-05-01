import { Request, Response, NextFunction } from 'express';
import { createWriteStream } from 'fs';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import path from 'path';
import { emitError } from '../emitters/errorEmitter';

export function requestLogger(req: Request, res: Response, next: NextFunction){
    try{
        const requestLogFile = path.join(__dirname, '..', 'logs', 'requestLog.txt');
        const ws = createWriteStream(requestLogFile, { flags: 'a' });

        const time = format(new Date(), 'dd MMM yyyy\tHH:mm:ss aa');
        const entry = `ID: ${uuid()}\nTime: ${time}\nRoute: ${req.url}\nMethod: ${req.method}\nOrigin: ${req.headers.origin}\n\n`
        ws.write(entry);
        ws.end();

        next();
    }catch(e){
        emitError(e as string, req.url, req.method, req.headers.origin);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}