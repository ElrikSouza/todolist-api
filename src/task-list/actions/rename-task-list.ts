import { Action } from '../../action';
import { PermissionService } from '../../permissions/permission-service';
import { TaskList, TaskListInput } from '../task-list';
import { validateTaskListInput } from '../task-list-validation';
import { TaskListRepository } from '../task-list-repository';

export interface RenameTaskListResult {
    taskList: TaskList;
}

export class RenameTaskList implements Action<RenameTaskListResult> {
    private taskListRepository: TaskListRepository;
    private taskListPermissions: PermissionService;

    constructor(taskListRepository: TaskListRepository, taskListPermissions: PermissionService) {
        this.taskListRepository = taskListRepository;
        this.taskListPermissions = taskListPermissions;
    }

    public run = async (taskListInput: TaskListInput): Promise<RenameTaskListResult> => {
        validateTaskListInput(taskListInput);

        await this.taskListPermissions.assertUserHasPermission(taskListInput.id, taskListInput.user_id);

        const taskList = await this.taskListRepository.rename(taskListInput.name, taskListInput.id);
        return { taskList };
    };
}
