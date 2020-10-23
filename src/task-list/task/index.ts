import { Router } from 'express';
import { db } from '../../db';
import { PermissionService } from '../../permissions/permission-service';
import { ApiResourcePermissionService } from '../../permissions/api-resource-permissions';
import { CreateTaskAction } from './actions/create-task';
import { GetOneTaskAction } from './actions/get-one';
import { RemoveTaskAction } from './actions/remove-task';
import { TaskController } from './task-controller';
import { TaskDbSerivce } from './task-db-service';

export const taskSubmodule = (taskListPermissions: PermissionService): Router => {
    const taskRepository = new TaskDbSerivce(db);
    const taskPermissions = new ApiResourcePermissionService(taskRepository.getUserId, 'task');
    const taskController = new TaskController(
        new CreateTaskAction(taskRepository, taskListPermissions),
        new RemoveTaskAction(taskRepository, taskPermissions),
        new GetOneTaskAction(taskRepository, taskPermissions),
    );

    return Router()
        .post('/tasklists/:id', taskController.createTask)
        .delete('/tasks/:id', taskController.removeTask)
        .get('/tasks/:id', taskController.getOneTask);
};
