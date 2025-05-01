import EventEmitter from "node:events";
import fs from "fs";
import path from "node:path";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

class MyEmitter extends EventEmitter {}

export const errorEmitter = new MyEmitter();

export const emitError = (message: string, route: string, method: string,origin: string|undefined) => {
    errorEmitter.emit("error", message, route, method, origin);
}

export const onError = (message: string, route: string, method: string, origin: string|undefined) => {
    //Write to the error log
    const errorLogFile = path.join(__dirname, '..', 'logs', 'errorLog.txt');
    const rs = fs.createWriteStream(errorLogFile, { flags: 'a' });

    const time = format(new Date(), 'dd MMM yyyy\tHH:mm:ss aa');

    const entry = `ID: ${uuid()}\nTime: ${time}\nDetails: ${route} ${method} ${origin}\nMessage: ${message}\n\n`;

    rs.write(entry);
    rs.close();
    
    //NOTE: We can't put a try catch here because it would lead to a looping effect
}