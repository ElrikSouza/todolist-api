import { Schema } from 'joi';

export const createValidatorFromSchema = <T>(schema: Schema) => (toBeValidated: T): void => {
    const validationResult = schema.validate(toBeValidated);

    if (validationResult.error) {
        throw validationResult.error;
    }
};
