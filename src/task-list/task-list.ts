import Joi from 'joi';
import { idSchema } from '../validation/validate-id';
import { createValidatorFromSchema } from '../validation/validation-wrapper';

export interface TaskList {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
}

export type TaskListInput = Exclude<TaskList, 'created_at'>;

const taskListInputSchema = Joi.object({
    id: idSchema.optional(),
    user_id: idSchema,
    name: Joi.string().max(35).required(),
});

export const validateTaskListInput = createValidatorFromSchema(taskListInputSchema);
