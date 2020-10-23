import { Action } from '../../../action';
import { PermissionService } from '../../../permissions/permission-service';
import { validateId } from '../../../validation/validate-id';
import { TaskRepository } from '../task-repository';

export interface RemoveTaskResult {
    msg: 'The requested task has been deleted';
}

export class RemoveTaskAction implements Action<RemoveTaskResult> {
    private taskRepo: TaskRepository;
    private taskPermissions: PermissionService;

    constructor(taskRepo: TaskRepository, taskPermissions: PermissionService) {
        this.taskRepo = taskRepo;
        this.taskPermissions = taskPermissions;
    }

    public run = async (taskId: string, userId: string): Promise<RemoveTaskResult> => {
        validateId(taskId);
        validateId(userId);

        await this.taskPermissions.assertUserHasPermission(taskId, userId);

        await this.taskRepo.remove(taskId);
        return { msg: 'The requested task has been deleted' };
    };
}
