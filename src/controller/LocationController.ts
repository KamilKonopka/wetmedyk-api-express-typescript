import { Controller } from "./Controller";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Location } from "../entities/Location";

export class LocationController implements Controller {
    async getAll(request: Request, response: Response) {
        const locationRepository = getManager().getRepository(Location)
        const locations = await locationRepository.find();
        response.send(locations);
    }

    async getById(request: Request, response: Response) {
        const locationRepository = getManager().getRepository(Location);
        const location = await locationRepository.findOne(request.params.id);

        if (!location) {
            response.status(404);
            response.end();
            return;
        }

        response.send(location);
    }

    async post(request: Request, response: Response) {
        const locationsRepository = getManager().getRepository(Location);
        const newLocation = locationsRepository.create(request.body);

        await locationsRepository.save(newLocation);

        response.send(newLocation);
    }

    async putById(request: Request, response: Response) {
        const locationsRepository = getManager().getRepository(Location);
        const location = await locationsRepository.findOne(request.params.id);

        locationsRepository.merge(location, request.body);

        const result = await locationsRepository.save(location);

        response.status(200).send(result);
    }

    async deleteById(request: Request, response: Response) {
        const locationsRepository = getManager().getRepository(Location);
        const deleteLocation = await locationsRepository.delete(request.params.id);

        response.send(deleteLocation);
    }
}
