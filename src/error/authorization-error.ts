/**
    Class used by code that does not have access to the http layer

    This error is thrown when the application knows the identity of an user, but that user
    does not have access to what is being requested.

    It is equivalent to 403.
*/
export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'authorization';
        Error.captureStackTrace(this, this.constructor);
    }
}
