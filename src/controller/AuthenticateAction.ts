import { Request, Response } from "express";
import { encodeSession } from "../session/EncodeSession";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import { SECRET_KEY } from "../index";
import bcrypt from 'bcryptjs';

export const authenticateAction = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ where: { userName: req.body.userName } });

    if (!!user && user.userName === req.body.userName) {
        const passwordMatch = await bcrypt.compareSync(req.body.password, user.password);

        if (passwordMatch) {
            const session = await encodeSession(SECRET_KEY, {
                id: req.body.id,
                userName: req.body.userName,
                dateCreated: Date.now(),
            });

            return res.status(201).send(session);
        }
        return res.status(403).send({ message: 'Password or User Name does not match' });
    }
    return res.status(403).send({ message: 'User does not exist' });
}
