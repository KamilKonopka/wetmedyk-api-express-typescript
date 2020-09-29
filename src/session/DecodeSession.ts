import { DecodeResult, Session } from "../models/session.model";
import { decode, TAlgorithm } from 'jwt-simple';

export const decodeSession = (secretKey: string, tokenString: string): DecodeResult => {
    const algorithm: TAlgorithm = 'HS512';

    let result: Session;

    try {
        result = decode(tokenString, secretKey, false, algorithm);
    } catch (err) {
        const invalidTokenMessages = ['No token supplied', 'Not enough or too many segments'];
        const integrityErrorMessages = ['Signature verification failed', 'Algorithm not supported'];

        if (invalidTokenMessages.includes(err.message)) {
            return {
                type: 'invalid-token',
            }
        }

        if (integrityErrorMessages.includes(err.message)) {
            return {
                type: 'integrity-error',
            }
        }

        if (err.message.startsWith('Unexpected token')) {
            return {
                type: 'invalid-token',
            }
        }
        throw err;
    }

    return {
        type: 'valid',
        session: result,
    }
}
