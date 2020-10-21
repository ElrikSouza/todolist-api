import { v4 } from 'uuid';
import { Action } from '../../../action';
import { AuthorizationError } from '../../../error/authorization-error';
import { ResourceNotFound } from '../../../error/resource-not-found';
import { TaskListRepository } from '../../tasklist-repository';
import { Task, TaskInput, validateTaskInput } from '../task';
import { TaskRepository } from '../task-repository';

export interface CreateTaskActionResult {
    task: Task;
}

export class CreateTaskAction implements Action<CreateTaskActionResult> {
    private taskRepo: TaskRepository;
    private taskListRepo: TaskListRepository;

    constructor(taskRepo: TaskRepository, taskListRepo: TaskListRepository) {
        this.taskRepo = taskRepo;
        this.taskListRepo = taskListRepo;
    }

    public run = async (taskInput: TaskInput): Promise<CreateTaskActionResult> => {
        validateTaskInput(taskInput);
        const taskListOwnerId = await this.taskListRepo.getUserId(taskInput.task_list_id);

        if (taskListOwnerId == undefined) {
            throw new ResourceNotFound('Requested task list does not exist');
        }

        if (taskListOwnerId != taskInput.user_id) {
            throw new AuthorizationError('The current user does not have permission to add tasks to this task list');
        }

        const task = await this.taskRepo.add({ ...taskInput, id: v4() });
        return { task };
    };
}
