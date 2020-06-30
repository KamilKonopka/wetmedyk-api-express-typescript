import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Location } from "../entities/Location";

export async function locationPutById(request: Request, response: Response) {
    const locationsRepository = getManager().getRepository(Location);
    const location = await locationsRepository.findOne(request.params.id);

    locationsRepository.merge(location, request.body);

    const result = await locationsRepository.save(location);

    response.send(result);
}
