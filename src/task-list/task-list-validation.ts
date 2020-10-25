import Joi from 'joi';
import { idSchema } from '../validation/validate-id';
import { createValidatorFromSchema } from '../validation/validation-wrapper';

const taskListInputSchema = Joi.object({
    id: idSchema.optional(),
    user_id: idSchema,
    name: Joi.string().max(35).required(),
});

export const validateTaskListInput = createValidatorFromSchema(taskListInputSchema);
