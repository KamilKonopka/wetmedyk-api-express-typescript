import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../entities/Employee";

export async function employeeDeleteByIdAction(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const deleteItem = await employeeRepository.delete(request.params.id);

    response.send(deleteItem);
}
