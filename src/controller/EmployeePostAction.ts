import { getManager } from "typeorm";
import { Employee } from "../entities/Employee.js";
import { Response, Request } from "express";

export async function employeePostAction(request: Request, response: Response) {
    const postRepository = getManager().getRepository(Employee);
    const newPost = postRepository.create(request.body);

    await postRepository.save(newPost);

    response.send(newPost);
}
