import { Action } from '../../action';
import { validateId } from '../../validation/validate-id';
import { TaskList } from '../task-list';
import { TaskListRepository } from '../tasklist-repository';

export interface GetAllTaskListsResult {
    taskLists: TaskList[];
}

export class GetAllTaskListsAction implements Action<GetAllTaskListsResult> {
    private taskListRepo: TaskListRepository;

    constructor(taskListRepo: TaskListRepository) {
        this.taskListRepo = taskListRepo;
    }

    public run = async (userId: string): Promise<GetAllTaskListsResult> => {
        validateId(userId);

        const taskLists = await this.taskListRepo.getAll(userId);
        return { taskLists };
    };
}
