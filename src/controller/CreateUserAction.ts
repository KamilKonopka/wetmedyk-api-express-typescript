import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';

export const createUserAction = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);
    const dbUser = await userRepository.findOne({ where: { userName: req.body.userName } });

    if (dbUser) {
        res.status(400).send({ message: 'user already exists' });
    } else {
        const saltRounds = 8;
        const hash = await bcrypt.hashSync(req.body.password, saltRounds);
        const dateCreated = Date.now().toString();
        const newUser = userRepository.create({
            ...req.body,
            dateCreated,
            password: hash,
        });

        await userRepository.save(newUser);

        res.send(newUser);
    }
}
