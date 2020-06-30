import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Location } from "../entities/Location";

export async function locationGetAllAction(request: Request, response: Response) {
    const locationRepository = getManager().getRepository(Location)
    const locations = await locationRepository.find();
    response.send(locations);
}
