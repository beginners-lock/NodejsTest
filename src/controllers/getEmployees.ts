import { Request, Response } from 'express';
import data from './../models/employees.json';

export function getEmployees(req: Request, res: Response){
    res.status(200).send({ message:'success', employees: data });
}