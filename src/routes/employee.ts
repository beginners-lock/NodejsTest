import express from "express";
import { getEmployees } from "../controllers/employee/getEmployees";
import { createEmployee } from "../controllers/employee/createEmployee";
import { getEmployeeById } from "../controllers/employee/getEmployeeById";
import { editEmployee } from "../controllers/employee/editEmployee";
import { editEmployeeAttribute } from "../controllers/employee/editEmployeeAttribute";
import { deleteEmployee } from "../controllers/employee/deleteEmployee";

export const employeeRouter = express.Router();

employeeRouter.route('/')
    .get(getEmployees)
    .post(createEmployee);

employeeRouter.route('/:id')
    .get(getEmployeeById)
    .put(editEmployee)
    .patch(editEmployeeAttribute)
    .delete(deleteEmployee)