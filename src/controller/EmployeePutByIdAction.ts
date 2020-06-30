import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../entities/Employee";

export async function employeePutByIdAction(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const employee = await employeeRepository.findOne(request.params.id);

    employeeRepository.merge(employee, request.body);

    const result = await employeeRepository.save(employee);

    response.send(result);
}
