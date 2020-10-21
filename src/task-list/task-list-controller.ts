import { Request, Response } from 'express';
import { Action } from '../action';
import { AuthenticatedRequest } from '../auth/jwt/jwt-middleware';
import { wrapWithErrorHandling } from '../http-helpers/error-handler';
import { CreateTaskListResult } from './actions/create-tasklist';
import { DeleteTaskListResult } from './actions/delete-tasklist';
import { GetAllTaskListsResult } from './actions/get-all';
import { GetOneTaskListResult } from './actions/get-one';
import { RenameTaskListResult } from './actions/rename-tasklist';

export class TaskListController {
    private renameTaskListAction: Action<RenameTaskListResult>;
    private removeTaskListAction: Action<DeleteTaskListResult>;
    private createTaskListAction: Action<CreateTaskListResult>;
    private getOneTaskListAction: Action<GetOneTaskListResult>;
    private getAllTaskListsAction: Action<GetAllTaskListsResult>;

    constructor(
        create: Action<CreateTaskListResult>,
        rename: Action<RenameTaskListResult>,
        remove: Action<DeleteTaskListResult>,
        getOne: Action<GetOneTaskListResult>,
        getAll: Action<GetAllTaskListsResult>,
    ) {
        this.createTaskListAction = create;
        this.renameTaskListAction = rename;
        this.removeTaskListAction = remove;
        this.getOneTaskListAction = getOne;
        this.getAllTaskListsAction = getAll;
    }

    public createTaskList = wrapWithErrorHandling(async (request: Request, response: Response) => {
        const { userId } = request as AuthenticatedRequest;

        const result = await this.createTaskListAction.run({ ...request.body, user_id: userId });
        return response.status(201).json(result);
    });

    public renameTaskList = wrapWithErrorHandling(async (request: Request, response: Response) => {
        const { userId } = request as AuthenticatedRequest;
        const { id } = request.params;

        const result = await this.renameTaskListAction.run({ ...request.body, user_id: userId, id });
        return response.status(200).json(result);
    });

    public deleteTaskList = wrapWithErrorHandling(async (request: Request, response: Response) => {
        const { userId } = request as AuthenticatedRequest;
        const { id } = request.params;

        const result = await this.removeTaskListAction.run(id, userId);
        return response.status(200).json(result);
    });

    public getOneTaskList = wrapWithErrorHandling(async (request: Request, response: Response) => {
        const { userId } = request as AuthenticatedRequest;
        const { id } = request.params;

        const result = await this.getOneTaskListAction.run(id, userId);
        return response.status(200).json(result);
    });

    public getAllTaskLists = wrapWithErrorHandling(async (request: Request, response: Response) => {
        const { userId } = request as AuthenticatedRequest;

        const result = await this.getAllTaskListsAction.run(userId);
        return response.status(200).json(result);
    });
}
