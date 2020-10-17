import { Response } from 'express';
import { ValidationError } from 'joi';
import { AuthenticationError } from '../error/authentication-error';
import { AuthorizationError } from '../error/authorization-error';
import { InputNotAllowedError } from '../error/input-not-allowed';
import { ResourceNotFound } from '../error/resource-not-found';

const createErrorResponse = (statusCode: number, error: Error, response: Response): Response => {
    return response.status(statusCode).json({ error: error.message });
};

export const errorToResponse = (error: Error, response: Response): Response => {
    switch (error.constructor) {
        case AuthenticationError:
            return createErrorResponse(401, error, response);
        case AuthorizationError:
            return createErrorResponse(403, error, response);
        case ValidationError:
            return createErrorResponse(400, error, response);
        case ResourceNotFound:
            return createErrorResponse(404, error, response);
        case InputNotAllowedError:
            return createErrorResponse(400, error, response);
        default:
            return response.status(500).json({ error: 'Unknown error' });
    }
};
