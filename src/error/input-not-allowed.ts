/**
    Class used by code that does not have access to the http layer.

    This error is thrown when the input syntax is correct, but it violates
    the rules of the application. (e.g., trying to register two users with the same email address)

    It is equivalent to 400
*/
export class InputNotAllowedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'input-not-allowed';
        Error.captureStackTrace(this, this.constructor);
    }
}
