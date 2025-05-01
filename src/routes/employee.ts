import express from "express";
import { getEmployees } from "../controllers/getEmployees";
import { createEmployee } from "../controllers/createEmployee";
import { getEmployeeById } from "../controllers/getEmployeeById";
import { editEmployee } from "../controllers/editEmployee";
import { editEmployeeAttribute } from "../controllers/editEmployeeAttribute";
import { deleteEmployee } from "../controllers/deleteEmployee";

export const employeeRouter = express.Router();

employeeRouter.route('/')
    .get(getEmployees)
    .post(createEmployee);

employeeRouter.route('/:id')
    .get(getEmployeeById)
    .put(editEmployee)
    .patch(editEmployeeAttribute)
    .delete(deleteEmployee)