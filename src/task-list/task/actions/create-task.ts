import { v4 } from 'uuid';
import { Action } from '../../../action';
import { PermissionService } from '../../../permissions/permission-service';
import { Task, TaskInput } from '../task';
import { validateTaskInput } from '../task-validation';
import { TaskRepository } from '../task-repository';

export interface CreateTaskActionResult {
    task: Task;
}

export class CreateTask implements Action<CreateTaskActionResult> {
    private taskRepo: TaskRepository;
    private taskListPermissions: PermissionService;

    constructor(taskRepo: TaskRepository, taskListPermissions: PermissionService) {
        this.taskRepo = taskRepo;
        this.taskListPermissions = taskListPermissions;
    }

    public run = async (taskInput: TaskInput): Promise<CreateTaskActionResult> => {
        validateTaskInput(taskInput);

        await this.taskListPermissions.assertUserHasPermission(taskInput.task_list_id, taskInput.user_id);

        const task = await this.taskRepo.add({ ...taskInput, id: v4() });
        return { task };
    };
}
