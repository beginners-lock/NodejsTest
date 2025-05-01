import path from 'path';
import fs from 'fs';

export function updateUsers(entry: string){
    const usersFile = path.join(__dirname, '..', 'models', 'users.json');

    const ws = fs.createWriteStream(usersFile);

    ws.write(entry);
    ws.close();
}