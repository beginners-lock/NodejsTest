import EventEmitter from "node:events";
import fs from "fs";
import path from "node:path";
import { format } from "date-fns";

class MyEmitter extends EventEmitter {}

export const errorEmitter = new MyEmitter();

export const emitError = (message: string) => {
    errorEmitter.emit("error", message);
}

export const onError = (message) => {
    //Write to the error log
    const errorLogFile = path.join(__dirname, '..', 'logs', 'errorLog.txt');
    const rs = fs.createWriteStream(errorLogFile, { flags: 'a' });

    const time = format(new Date(), 'dd MMM YYYY\tHH:mm:ss aa')

}