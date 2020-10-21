import { Action } from '../../action';
import { AuthorizationError } from '../../error/authorization-error';
import { ResourceNotFound } from '../../error/resource-not-found';
import { validateId } from '../../validation/validate-id';
import { TaskListRepository } from '../tasklist-repository';

export interface DeleteTaskListResult {
    msg: 'This task list has been deleted';
}

export class DeleteTaskList implements Action<DeleteTaskListResult> {
    private taskListRepo: TaskListRepository;

    constructor(taskListRepo: TaskListRepository) {
        this.taskListRepo = taskListRepo;
    }

    public run = async (taskListId: string, userId: string): Promise<DeleteTaskListResult> => {
        validateId(taskListId);
        validateId(userId);

        const ownerId = await this.taskListRepo.getUserId(taskListId);

        if (ownerId == null) {
            throw new ResourceNotFound('The requested task list does not exist');
        }

        if (ownerId !== userId) {
            throw new AuthorizationError('This user does not have permission to rename this task list');
        }

        await this.taskListRepo.remove(taskListId);

        return { msg: 'This task list has been deleted' };
    };
}
