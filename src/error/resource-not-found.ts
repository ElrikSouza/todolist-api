/**
    Class used by code that does not have access to the http layer.
*/
export class ResourceNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'not-found';
        Error.captureStackTrace(this, this.constructor);
    }
}
