import { Action } from '../../../action';
import { PermissionService } from '../../../permissions/permission-service';
import { Task, TaskUpdate, validateTaskUpdate } from '../task';
import { TaskRepository } from '../task-repository';

export interface EditTaskResult {
    task: Task;
}

export class EditTaskAction implements Action<EditTaskResult> {
    private taskRepo: TaskRepository;
    private taskPermissions: PermissionService;

    constructor(taskRepo: TaskRepository, taskPermissions: PermissionService) {
        this.taskRepo = taskRepo;
        this.taskPermissions = taskPermissions;
    }

    public run = async (taskUpdate: TaskUpdate): Promise<EditTaskResult> => {
        validateTaskUpdate(taskUpdate);
        this.taskPermissions.assertUserHasPermission(taskUpdate.id, taskUpdate.user_id);

        const task = await this.taskRepo.update(taskUpdate);
        return { task };
    };
}
