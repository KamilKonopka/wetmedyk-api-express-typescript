import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../entities/Employee";

export async function employeeDeleteByIdAction(request: Request, response: Response) {
    const deleteRepository = getManager().getRepository(Employee);
    const deleteItem = await deleteRepository.delete(request.params.id);

    response.send(deleteItem);
}
