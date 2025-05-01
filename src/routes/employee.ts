import express from "express";
import { getEmployees } from "../controllers/getEmployees";
import { createEmployee } from "../controllers/createEmployee";
import { getEmployeeById } from "../controllers/getEmployeeById";

export const employeeRouter = express.Router();

employeeRouter.route('/')
    .get(getEmployees)
    .post(createEmployee);

employeeRouter.route('/:id')
    .get(getEmployeeById)
    /*.put()
    .patch()
    .delete()*/