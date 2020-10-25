import { Router } from 'express';
import { db } from '../../db';
import { PermissionService } from '../../permissions/permission-service';
import { ApiResourcePermissionService } from '../../permissions/api-resource-permissions';
import { CreateTask } from './actions/create-task';
import { GetOneTask } from './actions/get-one';
import { RemoveTask } from './actions/remove-task';
import { TaskController } from './task-controller';
import { TaskDbSerivce } from './task-db-service';
import { EditTask } from './actions/edit-task';

export const taskSubmodule = (taskListPermissions: PermissionService): Router => {
    const taskRepository = new TaskDbSerivce(db);
    const taskPermissions = new ApiResourcePermissionService(taskRepository.getUserId, 'task');
    const taskController = new TaskController(
        new CreateTask(taskRepository, taskListPermissions),
        new RemoveTask(taskRepository, taskPermissions),
        new GetOneTask(taskRepository, taskPermissions),
        new EditTask(taskRepository, taskPermissions),
    );

    return Router()
        .post('/task-lists/:id', taskController.createTask)
        .delete('/tasks/:id', taskController.removeTask)
        .patch('/tasks/:id', taskController.editTask)
        .get('/tasks/:id', taskController.getOneTask);
};
