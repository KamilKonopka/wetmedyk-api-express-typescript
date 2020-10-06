import { Controller } from "./Controller";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export class UserController implements Controller {
    async post(req: Request, res: Response) {
        const repository = getManager().getRepository(User);
        const dbUser = await repository.findOne({where: {userName: req.body.userName}});

        if (dbUser) {
            res.status(400).send({message: 'user already exists'});
        } else {
            const saltRounds = 8;
            const hash = await bcrypt.hashSync(req.body.password, saltRounds);
            const dateCreated = Date.now().toString();
            const newUser = repository.create({
                ...req.body,
                dateCreated,
                password: hash,
            });

            await repository.save(newUser);

            res.send(newUser);
        }
    }
}
