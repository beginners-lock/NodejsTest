import { Request, Response } from 'express';
import data from '../../models/employees.json';
import { emitError } from '../../emitters/errorEmitter';
import { Employee } from '../../types';

export function getEmployeeById(req: Request, res: Response){
    try{
        const employees: Employee[] = data as Employee[];
        const id = req.params.id;

        const employee = employees.find(employee => employee.id === parseInt(id) );

        if(employee){
            res.status(200).send({ message: `success`, employee: employee });
        }else{
            res.status(200).send({ message: `No user found with ID: ${id}` });
        }

    }catch(error){
        console.log(error);
        emitError(error as string, req.url, req.method, req.headers.origin);
        res.status(500);
    }
}