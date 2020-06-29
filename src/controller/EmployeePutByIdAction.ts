import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../entities/Employee";

export async function employeePutByIdAction(request: Request, response: Response) {
    const putRepository = getManager().getRepository(Employee);
    const employee = await putRepository.findOne(request.params.id);
    putRepository.merge(employee, request.body);
    const result = await putRepository.save(employee);

    response.send(result);
}
