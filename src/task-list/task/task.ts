import Joi from 'joi';
import { idSchema } from '../../validation/validate-id';
import { createValidatorFromSchema } from '../../validation/validation-wrapper';

export enum TaskProgress {
    TODO = 0,
    DOING = 1,
    DONE = 2,
}

export interface Task {
    id?: string;
    user_id: string;
    task_list_id: string;
    name: string;
    description?: string;
    scheduled_to?: Date | number | string;
    progress: TaskProgress;
    created_at: string;
}

export type TaskInput = Exclude<Task, 'created_at' | 'progress'>;
const taskInputSchema = Joi.object({
    user_id: idSchema,
    task_list_id: idSchema,
    name: Joi.string().required().max(35),
    description: Joi.string().max(255),
    scheduled_to: Joi.date(),
});

export const validateTaskInput = createValidatorFromSchema(taskInputSchema);
