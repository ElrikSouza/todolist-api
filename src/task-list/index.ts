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
import { TaskListPermissionService } from './task-list-permissions';

const taskListRepo = new DbTaskListService(db);
const taskListPermissionService = new TaskListPermissionService(taskListRepo.getUserId);
const taskListController = new TaskListController(
    new CreateTaskList(taskListRepo),
    new RenameTaskList(taskListRepo, taskListPermissionService),
    new DeleteTaskList(taskListRepo, taskListPermissionService),
    new GetOneTaskListAction(taskListRepo, taskListPermissionService),
    new GetAllTaskListsAction(taskListRepo),
);

export const taskListModule = Router()
    .use(jwtMiddleware)
    .post('/tasklists', taskListController.createTaskList)
    .get('/tasklists/:id', taskListController.getOneTaskList)
    .get('/tasklists', taskListController.getAllTaskLists)
    .put('/tasklists/:id', taskListController.renameTaskList)
    .delete('/tasklists/:id', taskListController.deleteTaskList)
    .use(taskSubmodule(taskListRepo));
