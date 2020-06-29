import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../entities/Employee";

export async function employeePutByIdAction(request: Request, response: Response) {
    const putRepository = getManager().getRepository(Employee);
    const newPut = await putRepository.update(request.params.id, request.body);

    response.send(newPut);
}
