import { Action } from '../../../action';
import { PermissionService } from '../../../permissions/permission-service';
import { validateId } from '../../../validation/validate-id';
import { Task } from '../task';
import { TaskRepository } from '../task-repository';

export interface GetOneTaskResult {
    task: Task;
}

export class GetOneTaskAction implements Action<GetOneTaskResult> {
    private taskRepo: TaskRepository;
    private taskPermissions: PermissionService;

    constructor(taskRepo: TaskRepository, taskPermissions: PermissionService) {
        this.taskRepo = taskRepo;
        this.taskPermissions = taskPermissions;
    }

    public run = async (taskId: string, userId: string): Promise<GetOneTaskResult> => {
        validateId(taskId);
        validateId(userId);

        await this.taskPermissions.assertUserHasPermission(taskId, userId);

        const task = await this.taskRepo.getOne(taskId);
        return { task };
    };
}
