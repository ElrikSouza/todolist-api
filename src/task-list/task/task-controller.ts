import { Action } from '../../action';
import { getUserIdFromRequest } from '../../auth/jwt/jwt-middleware';
import { wrapWithErrorHandling } from '../../http-helpers/error-handler';
import { CreateTaskActionResult } from './actions/create-task';
import { GetOneTaskResult } from './actions/get-one';
import { RemoveTaskResult } from './actions/remove-task';

export class TaskController {
    private createTaskAction: Action<CreateTaskActionResult>;
    private removeTaskAction: Action<RemoveTaskResult>;
    private getOneTaskAction: Action<GetOneTaskResult>;

    constructor(
        createTaskAction: Action<CreateTaskActionResult>,
        removeTaskAction: Action<RemoveTaskResult>,
        getOneTaskAction: Action<GetOneTaskResult>,
    ) {
        this.createTaskAction = createTaskAction;
        this.removeTaskAction = removeTaskAction;
        this.getOneTaskAction = getOneTaskAction;
    }

    public createTask = wrapWithErrorHandling(async (request, response) => {
        const userId = getUserIdFromRequest(request);
        const taskListId = request.params.id;

        const result = await this.createTaskAction.run({ ...request.body, user_id: userId, task_list_id: taskListId });
        return response.status(201).json(result);
    });

    public removeTask = wrapWithErrorHandling(async (request, response) => {
        const userId = getUserIdFromRequest(request);
        const taskId = request.params.id;

        const result = await this.removeTaskAction.run(taskId, userId);
        return response.status(200).json(result);
    });

    public getOneTask = wrapWithErrorHandling(async (request, response) => {
        const userId = getUserIdFromRequest(request);
        const taskId = request.params.id;

        const result = await this.getOneTaskAction.run(taskId, userId);
        return response.status(200).json(result);
    });
}
