import { Router } from 'express';
import { jwtMiddleware } from '../auth/jwt/jwt-middleware';
import { db } from '../db';
import { CreateTaskList } from './actions/create-tasklist';
import { DeleteTaskList } from './actions/delete-tasklist';
import { GetAllTaskListsAction } from './actions/get-all';
import { GetOneTaskListAction } from './actions/get-one';
import { RenameTaskList } from './actions/rename-tasklist';
import { DbTaskListService } from './db-task-list-service';
import { taskSubmodule } from './task';
import { TaskListController } from './task-list-controller';
import { ApiResourcePermissionService } from '../permissions/api-resource-permissions';

const taskListRepo = new DbTaskListService(db);
const taskListPermissionService = new ApiResourcePermissionService(taskListRepo.getUserId, 'task list');
const taskListController = new TaskListController(
    new CreateTaskList(taskListRepo),
    new RenameTaskList(taskListRepo, taskListPermissionService),
    new DeleteTaskList(taskListRepo, taskListPermissionService),
    new GetOneTaskListAction(taskListRepo, taskListPermissionService),
    new GetAllTaskListsAction(taskListRepo),
);

export const taskListModule = Router()
    .use(jwtMiddleware)
    .post('/task-lists', taskListController.createTaskList)
    .get('/task-lists/:id', taskListController.getOneTaskList)
    .get('/task-lists', taskListController.getAllTaskLists)
    .put('/task-lists/:id', taskListController.renameTaskList)
    .delete('/task-lists/:id', taskListController.deleteTaskList)
    .use(taskSubmodule(taskListPermissionService));
