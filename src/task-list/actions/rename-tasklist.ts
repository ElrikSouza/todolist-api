import { Action } from '../../action';
import { AuthorizationError } from '../../error/authorization-error';
import { ResourceNotFound } from '../../error/resource-not-found';
import { TaskList, TaskListInput, validateTaskListInput } from '../task-list';
import { TaskListRepository } from '../tasklist-repository';

export interface RenameTaskListResult {
    taskList: TaskList;
}

export class RenameTaskList implements Action<RenameTaskListResult> {
    private taskListRepository: TaskListRepository;

    constructor(taskListRepository: TaskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    public run = async (taskListInput: TaskListInput): Promise<RenameTaskListResult> => {
        validateTaskListInput(taskListInput);
        const ownerId = await this.taskListRepository.getUserId(taskListInput.id);

        if (ownerId == null) {
            throw new ResourceNotFound('The requested task list does not exist');
        }

        if (ownerId !== taskListInput.user_id) {
            throw new AuthorizationError('This user does not have permission to rename this task list');
        }

        const taskList = await this.taskListRepository.rename(taskListInput.name, taskListInput.id);
        return { taskList };
    };
}
