import { Action } from '../../../action';
import { AuthorizationError } from '../../../error/authorization-error';
import { ResourceNotFound } from '../../../error/resource-not-found';
import { Task } from '../task';
import { TaskRepository } from '../task-repository';

export interface GetOneTaskResult {
    task: Task;
}

export class GetOneTaskAction implements Action<GetOneTaskResult> {
    private taskRepo: TaskRepository;

    constructor(taskRepo: TaskRepository) {
        this.taskRepo = taskRepo;
    }

    public run = async (taskId: string, userId: string): Promise<GetOneTaskResult> => {
        const ownerId = await this.taskRepo.getUserId(taskId);

        if (ownerId == undefined) {
            throw new ResourceNotFound('The requested task does not exist');
        }

        if (ownerId != userId) {
            throw new AuthorizationError('This user does not have access to this task');
        }

        const task = await this.taskRepo.getOne(taskId);
        return { task };
    };
}
