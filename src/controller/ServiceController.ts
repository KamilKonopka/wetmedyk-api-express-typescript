import {Controller} from "./Controller";
import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Service} from "../entities/Service";

export class ServiceController implements Controller {
    async getAll(request: Request, response: Response) {
        const repository = getManager().getRepository(Service);
        const services = await repository.find();

        response.send(services);
    }

    async getById(request: Request, response: Response) {
        const repository = getManager().getRepository(Service);
        const service = await repository.findOne(request.params.id);

        if (!service) {
            response.status(404);
            response.end();
            return;
        }

        response.send(service);
    }

    async post(request: Request, response: Response) {
        const repository = getManager().getRepository(Service);
        const newService = repository.create(request.body);

        await repository.save(newService);
        response.send(newService);
    }

    async putById(request: Request, response: Response) {
        const repository = getManager().getRepository(Service);
        const service = await repository.findOne(request.params.id);
        repository.merge(service, request.body);

        const result = await repository.save(service);
        response.send(result);
    }

    async deleteById(request: Request, response: Response) {
        const repository = getManager().getRepository(Service);
        const deleteItem = await repository.delete(request.params.id);

        response.send(deleteItem);
    }
}
