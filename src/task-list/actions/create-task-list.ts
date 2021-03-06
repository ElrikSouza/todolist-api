import { v4 } from 'uuid';
import { Action } from '../../action';
import { TaskList, TaskListInput } from '../task-list';
import { validateTaskListInput } from '../task-list-validation';
import { TaskListRepository } from '../task-list-repository';

export interface CreateTaskListResult {
    taskList: TaskList;
}

export class CreateTaskList implements Action<CreateTaskListResult> {
    private taskListRepo: TaskListRepository;

    constructor(taskListRepo: TaskListRepository) {
        this.taskListRepo = taskListRepo;
    }

    public run = async (taskListInput: TaskListInput): Promise<CreateTaskListResult> => {
        validateTaskListInput(taskListInput);
        const taskList = await this.taskListRepo.add({ ...taskListInput, id: v4() });
        return { taskList };
    };
}
