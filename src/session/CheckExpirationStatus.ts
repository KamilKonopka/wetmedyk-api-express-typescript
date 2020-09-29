import { ExpirationStatus, Session } from "../models/session.model";

export const checkExpirationDate = (token: Session): ExpirationStatus => {
    const now = Date.now();

    if (token.expires > now) {
        return 'active';
    }

    const threeHoursInMs = 3 * 60 * 60 * 1000;
    const threeHoursAfterExpiration = token.expires + threeHoursInMs;

    if (threeHoursAfterExpiration > now) {
        return 'grace';
    }

    return "expired";
}
