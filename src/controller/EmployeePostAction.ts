import { getManager } from "typeorm";
import { Employee } from "../entities/Employee.js";
import { Response, Request } from "express";

export async function employeePostAction(request: Request, response: Response) {
    const employeeRepository = getManager().getRepository(Employee);
    const newPost = employeeRepository.create(request.body);

    await employeeRepository.save(newPost);

    response.send(newPost);
}
