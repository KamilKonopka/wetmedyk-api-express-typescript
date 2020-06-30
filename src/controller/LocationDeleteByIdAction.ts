import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Location } from "../entities/Location";

export async function locationDeleteById(request: Request, response: Response) {
    const locationsRepository = getManager().getRepository(Location);
    const deleteLocation = await locationsRepository.delete(request.params.id);

    response.send(deleteLocation);
}
