import { NextFunction, Request, Response } from "express";
import { DecodeResult, ExpirationStatus, Session } from "../models/session.model";
import { decodeSession } from "./DecodeSession";
import { checkExpirationDate } from "./CheckExpirationStatus";
import { encodeSession } from "./EncodeSession";
import { SECRET_KEY } from "../index";

export const requireJwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const unauthorized = (message: string) => res.status(403).json({
        message,
        ok: false,
        status: 403,
    });

    const requestHeader = "X-JWT-Token";
    const responseHeader = "X-Renewed-JWT-Token";
    const header = req.header(requestHeader);

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found`);
        return;
    }

    const decodedSession: DecodeResult = decodeSession(SECRET_KEY, header);

    if (decodedSession.type === 'integrity-error' || decodedSession.type === 'invalid-token') {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationDate(decodedSession.session);

    let session: Session;

    switch (expiration) {
        case 'expired':
            unauthorized(`Authorization token has expired. Please create a new authorization token.`);
            return;
        case 'grace':
            const {token, expires, issued} = encodeSession(SECRET_KEY, decodedSession.session);
            session = {
                ...decodedSession.session,
                expires,
                issued,
            }
            res.setHeader(responseHeader, token);
            break;
        case 'active':
            session = decodedSession.session;

            res.locals = {
                ...res.locals,
                session,
            }
    }
    next();
}
