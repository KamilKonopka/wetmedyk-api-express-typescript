import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Session } from "../models/session.model";
import { getManager } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import { encodeSession } from "../session/EncodeSession";
import { SECRET_KEY } from "../index";

export class AuthenticationController implements Controller {
    async getById(req: Request, res: Response) {
        const session: Session = res.locals.session;

        if (!session) {
            res.status(403).send({message: 'Not Logged In'});
        } else {
            res.status(200).send({message: `Your username is ${session.userName}`});
        }
    }

    async post(req: Request, res: Response): Promise<any> {
        const repository = getManager().getRepository(User);
        const user = await repository.findOne({where: {userName: req.body.userName}});

        if (!!user && user.userName === req.body.userName) {
            const passwordMatch = await bcrypt.compareSync(req.body.password, user.password);

            if (passwordMatch) {
                const session = await encodeSession(SECRET_KEY, {
                    userName: req.body.userName,
                    dateCreated: Date.now(),
                });

                return res.status(201).send(session);
            }
            return res.status(403).send({message: 'Password or User Name does not match'});
        }
        return res.status(403).send({message: 'User does not exist'});
    }
}
