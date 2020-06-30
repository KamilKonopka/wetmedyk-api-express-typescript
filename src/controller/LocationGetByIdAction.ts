import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Location } from "../entities/Location";

export async function locationGetByIdAction(request: Request, response: Response) {
    const locationRepository = getManager().getRepository(Location);
    const location = await locationRepository.findOne(request.params.id);

    if (!location) {
        response.status(404);
        response.end();
        return;
    }

    response.send(location);
}
