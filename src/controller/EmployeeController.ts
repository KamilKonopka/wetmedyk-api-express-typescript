import { getManager } from "typeorm";
import { Employee } from "../entities/Employee";
import { Request, Response } from "express";
import { Controller } from "./Controller";

export class EmployeeController implements Controller {
    async getAll(request: Request, response: Response) {
        const repository = getManager().getRepository(Employee);
        const employees = await repository.find();
        response.send(employees);
    }

    async getById(request: Request, response: Response) {
        const repository = getManager().getRepository(Employee);
        const employee = await repository.findOne(request.params.id);

        if (!employee) {
            response.status(404);
            response.end();
            return;
        }

        response.send(employee);
    }

    async post(request: Request, response: Response) {
        const repository = getManager().getRepository(Employee);
        const newPost = repository.create(request.body);

        await repository.save(newPost);
        response.send(newPost);
    }

    async putById(request: Request, response: Response) {
        const repository = getManager().getRepository(Employee);
        const employee = await repository.findOne(request.params.id);
        repository.merge(employee, request.body);
        const result = await repository.save(employee);
        response.send(result);
    }

    async deleteById(request: Request, response: Response) {
        const repository = getManager().getRepository(Employee);
        const deleteItem = await repository.delete(request.params.id);
        response.send(deleteItem);
    }
}
