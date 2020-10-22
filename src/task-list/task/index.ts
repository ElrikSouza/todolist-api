import { Router } from 'express';
import { db } from '../../db';
import { TaskListRepository } from '../tasklist-repository';
import { CreateTaskAction } from './actions/create-task';
import { GetOneTaskAction } from './actions/get-one';
import { RemoveTaskAction } from './actions/remove-task';
import { TaskController } from './task-controller';
import { TaskDbSerivce } from './task-db-service';

export const taskSubmodule = (taskListRepository: TaskListRepository): Router => {
    const taskRepository = new TaskDbSerivce(db);
    const taskController = new TaskController(
        new CreateTaskAction(taskRepository, taskListRepository),
        new RemoveTaskAction(taskRepository),
        new GetOneTaskAction(taskRepository),
    );
    return Router()
        .post('/tasklists/:id', taskController.createTask)
        .delete('/tasks/:id', taskController.removeTask)
        .get('/tasks/:id', taskController.getOneTask);
};
