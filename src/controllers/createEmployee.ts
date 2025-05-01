import { Request, Response } from 'express';
import data from './../models/employees.json';
import { emitError } from '../emitters/errorEmitter';
import { updateEmployees } from '../utils/updateEmployees';
import { Employee } from '../types';

export function createEmployee(req: Request, res: Response){
    try{
        const employees: Employee[] = data as Employee[];
        const newId = employees.length+1;
        const employee: Employee = req.body;

        if(!employee.name){ res.status(401).send({ message: 'Employee name must be provided' }); return; }
        if(!employee.gender){ res.status(401).send({ message: 'Employee gender must be provided' }); return; }
        if(!employee.phone){ res.status(401).send({ message: 'Employee phone must be provided' }); return; }
        if(!employee.salary){ res.status(401).send({ message: 'Employee salary must be provided' }); return; }

        employees.push({
            ...employee,
            id: newId
        });

        console.log(employees);

        updateEmployees(JSON.stringify(employees, null, 2));
        res.status(200).send({ message: 'success', employee: employees[employees.length-1] });
    }catch(error){
        console.log(error);
        emitError(error as string, req.url, req.method, req.headers.origin);
        res.status(500);
    }
}