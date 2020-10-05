import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Newsletter } from "../entities/Newsletter";

export const newsletterDeleteByIdAction = async (req: Request, res: Response) => {
    const newsletterRepository = getManager().getRepository(Newsletter);

    const deleteEmail = await newsletterRepository
        .findOne({ where: { email: req.body.email }});

    await newsletterRepository.delete(deleteEmail);

    res.status(200).send({ message: `Email address ${req.body.email} was successfully removed from our database`, status: 200 });
}
