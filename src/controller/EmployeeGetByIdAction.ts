import { getManager } from "typeorm";
import { Employee } from "../entities/Employee.js";
import { Request, Response } from "express";

export async function employeeGetByIdAction(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const employee = await employeeRepository.findOne(request.params.id);

    if (!employee) {
        response.status(404);
        response.end();
        return;
    }

    response.send(employee);
}
