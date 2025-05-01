import path from 'path';
import fs from 'fs';

export function updateEmployees(entry: string){
    const employeeFile = path.join(__dirname, '..', 'models', 'employees.json');

    const ws = fs.createWriteStream(employeeFile);

    ws.write(entry);
    ws.close();
}