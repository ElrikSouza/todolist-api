import Joi from 'joi';
import { idSchema } from '../../validation/validate-id';
import { createValidatorFromSchema } from '../../validation/validation-wrapper';

const taskInputSchema = Joi.object({
    user_id: idSchema,
    task_list_id: idSchema,
    name: Joi.string().required().max(35),
    description: Joi.string().max(255),
    scheduled_to: Joi.date(),
});

const taskUpdateSchema = Joi.object({
    id: idSchema,
    user_id: idSchema,
    name: Joi.string(),
    description: Joi.string().max(255),
    scheduled_to: Joi.date(),
    progress: Joi.number().valid(0, 1, 2),
});

export const validateTaskInput = createValidatorFromSchema(taskInputSchema);
export const validateTaskUpdate = createValidatorFromSchema(taskUpdateSchema);
