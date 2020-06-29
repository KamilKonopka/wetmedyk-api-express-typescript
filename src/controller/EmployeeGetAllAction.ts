import { getManager } from "typeorm";
import { Employee } from "../entities/Employee.js";
import { Response, Request } from "express";

export async function employeeGetAllAction(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee)
    const employees = await employeeRepository.find();
    response.send(employees);
}
