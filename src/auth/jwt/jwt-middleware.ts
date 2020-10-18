import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../../error/authentication-error';
import { getIdFromToken } from './token';

export interface AuthenticatedRequest extends Request {
    userId: string;
}

const getTokenFromRequest = (request: Request) => {
    const header = request.get('Authorization');

    if (header == null || header.trim() == '') {
        throw new AuthenticationError('The authorization cannot be empty');
    }

    const splittedHeader = header.split(' ');

    if (splittedHeader.length == 1) {
        return splittedHeader[0];
    }

    return splittedHeader[1];
};

export const jwtMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const token = getTokenFromRequest(request);
        const userId = getIdFromToken(token);

        (request as AuthenticatedRequest).userId = userId;
        return next();
    } catch (error) {
        next(error);
    }
};
