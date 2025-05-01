import { Request, Response } from 'express';
import data from '../../models/employees.json';
import { updateEmployees } from '../../utils/updateEmployees';
import { emitError } from '../../emitters/errorEmitter';
import { Employee } from '../../types';

export function deleteEmployee(req: Request, res: Response){
    try{
        const employees = data as Employee[];
        const id = parseInt(req.params.id);

        const userIndex = employees.findIndex(employee => employee.id === id);

        if(userIndex===-1){
            res.status(401).send({ message: `Employee with ID: ${id} does not exist` });
            return;
        }

        employees.splice(userIndex, 1);
        updateEmployees(JSON.stringify(employees, null, 2));

        res.status(200).send({ message: 'success' });
    }catch(error){
        console.log(error);
        emitError(error as string, req.url, req.method, req.headers.origin);
        res.status(500);
    }
}