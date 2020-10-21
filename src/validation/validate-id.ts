import Joi from 'joi';
import { createValidatorFromSchema } from './validation-wrapper';

export const idSchema = Joi.string().required().uuid();
export const validateId = createValidatorFromSchema(idSchema);
