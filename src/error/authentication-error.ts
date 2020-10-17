/**
    Class used by code that does not have access to the http layer.

    This error is thrown when the user failed to authenticate.

    It is equivalent to 401
*/
export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'authentication';
        Error.captureStackTrace(this, this.constructor);
    }
}
