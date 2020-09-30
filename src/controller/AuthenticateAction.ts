import { Request, Response } from "express";
import { encodeSession } from "../session/EncodeSession";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import { SECRET_KEY } from "../index";

export const authenticateAction = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(req.body);

    if (!!user && user.password === req.body.password) {
        const session = await encodeSession(SECRET_KEY, {
            id: req.body.id,
            userName: req.body.userName,
            dateCreated: Date.now(),
        });

        return res.status(201).send(session);
    }
    return res.status(403).send();
}
