import { Request, Response } from "express";
import { Session } from "../models/session.model";

export const authenticateGetSession = async (req: Request, res: Response) => {
    const session: Session = await res.locals.session;

    if (!session) {
        res.status(403).send({ message: 'Not Logged In' });
    } else {
        res.status(200).send({ message: `Your username is ${session.userName}` });
    }
}
