import { encode, TAlgorithm } from 'jwt-simple';
import { PartialSession, Session } from "../models/session.model";

export const encodeSession = (secretKey: string, partialSession: PartialSession) => {
    const algorithm: TAlgorithm = 'HS512';
    const issued = Date.now();
    const thirtyMinutesInMs = 30 * 60 * 1000;
    const expires = issued + thirtyMinutesInMs;
    const session: Session = {
        ...partialSession,
        issued,
        expires,
    }

    return {
        issued,
        expires,
        token: encode(session, secretKey, algorithm),
    }
}
