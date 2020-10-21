import { Action } from '../../../action';
import { AuthorizationError } from '../../../error/authorization-error';
import { ResourceNotFound } from '../../../error/resource-not-found';
import { validateId } from '../../../validation/validate-id';
import { TaskRepository } from '../task-repository';

export interface RemoveTaskResult {
    msg: 'The requested task has been deleted';
}

export class RemoveTaskAction implements Action<RemoveTaskResult> {
    private taskRepo: TaskRepository;

    constructor(taskRepo: TaskRepository) {
        this.taskRepo = taskRepo;
    }

    public run = async (taskId: string, userId: string): Promise<RemoveTaskResult> => {
        validateId(taskId);
        validateId(userId);

        const ownerId = await this.taskRepo.getUserId(taskId);

        if (ownerId == undefined) {
            throw new ResourceNotFound('The requested task does not exist');
        }

        if (ownerId !== userId) {
            throw new AuthorizationError('This user does not have permission to remove this task.');
        }

        await this.taskRepo.remove(taskId);
        return { msg: 'The requested task has been deleted' };
    };
}
