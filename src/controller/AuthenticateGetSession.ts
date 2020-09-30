import { Request, Response } from "express";
import { Session } from "../models/session.model";
import jwt from 'jwt-simple';
import { SECRET_KEY } from "../index";

export const authenticateGetSession = async (req: Request, res: Response) => {
    const [bearer, token]  = req.header('authorization').split(' ');
    const session: Session = jwt.decode(token, SECRET_KEY);

    console.log(res.locals.session);

    if (!session) {
        res.status(403).send({ message: 'Not Logged In' });
    } else {
        res.status(200).send({ message: `Your username is ${session.userName}` });
    }
}
