import { Request, Response } from "express";
import { Session } from "../models/session.model";

export const authenticateGetSession = async (req: Request, res: Response) => {
    const session: Session = !!res.locals?.session ? await res.locals.session : { userName: 'Not Logged In' };

    res.status(200).send({ message: `Your username is ${session.userName}` });
}
