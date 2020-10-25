import { Action } from '../../action';
import { PermissionService } from '../../permissions/permission-service';
import { validateId } from '../../validation/validate-id';
import { TaskList } from '../task-list';
import { TaskListRepository } from '../task-list-repository';

export interface GetOneTaskListResult {
    taskList: TaskList;
}

export class GetOneTaskList implements Action<GetOneTaskListResult> {
    private taskListRepo: TaskListRepository;
    private taskListPermissions: PermissionService;

    constructor(taskListRepo: TaskListRepository, taskListPermissions: PermissionService) {
        this.taskListRepo = taskListRepo;
        this.taskListPermissions = taskListPermissions;
    }

    public run = async (taskListId: string, userId: string): Promise<GetOneTaskListResult> => {
        validateId(taskListId);
        validateId(userId);

        await this.taskListPermissions.assertUserHasPermission(taskListId, userId);

        const taskList = await this.taskListRepo.getOne(taskListId);

        return { taskList };
    };
}
