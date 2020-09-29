import { Request, Response } from "express";
import { encodeSession } from "../session/EncodeSession";
import { getManager } from "typeorm";
import { User } from "../entities/User";

export const authenticateAction = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(req.body.id);

    if (user.password === req.body.password) {
        const session = await encodeSession('', {
            id: req.body.id,
            userName: req.body.userName,
            dateCreated: Date.now(),
        });

        return res.status(201).send(session);
    } else {
        res.status(403).send();
    }


}
