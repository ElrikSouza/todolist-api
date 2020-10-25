import { Action } from '../../action';
import { PermissionService } from '../../permissions/permission-service';
import { validateId } from '../../validation/validate-id';
import { TaskListRepository } from '../task-list-repository';

export interface DeleteTaskListResult {
    msg: 'This task list has been deleted';
}

export class DeleteTaskList implements Action<DeleteTaskListResult> {
    private taskListRepo: TaskListRepository;
    private taskListPermissions: PermissionService;

    constructor(taskListRepo: TaskListRepository, taskListPermissions: PermissionService) {
        this.taskListRepo = taskListRepo;
        this.taskListPermissions = taskListPermissions;
    }

    public run = async (taskListId: string, userId: string): Promise<DeleteTaskListResult> => {
        validateId(taskListId);
        validateId(userId);

        await this.taskListPermissions.assertUserHasPermission(taskListId, userId);

        await this.taskListRepo.remove(taskListId);

        return { msg: 'This task list has been deleted' };
    };
}
