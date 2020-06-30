import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Location } from "../entities/Location";

export async function locationPostAction(request: Request, response: Response) {
    const locationsRepository = getManager().getRepository(Location);
    const newLocation = locationsRepository.create(request.body);

    await locationsRepository.save(newLocation);

    response.send(newLocation);
}
