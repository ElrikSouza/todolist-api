import { NextFunction, Request, Response } from 'express';
import { errorToResponse } from './error-to-response';

interface ErrorHandlerMiddleware {
    (error: Error, request: Request, response: Response, next: NextFunction): Promise<Response>;
}

export interface AsyncRouteHandler {
    (request: Request, response: Response): Promise<Response>;
}

export interface WrappedAsyncRouteHandler {
    (request: Request, response: Response, next: NextFunction): Promise<Response | undefined>;
}

export const wrapWithErrorHandling = (handler: AsyncRouteHandler): WrappedAsyncRouteHandler => {
    return async (request, response, next) => {
        try {
            const result = await handler(request, response);
            return result;
        } catch (error) {
            next(error);
        }
    };
};

export const errorHandlerMiddleWare: ErrorHandlerMiddleware = async (error, _request, response, _) => {
    return errorToResponse(error, response);
};
