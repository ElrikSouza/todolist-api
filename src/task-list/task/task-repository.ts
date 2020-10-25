import { Task, TaskInput, TaskUpdate } from './task';

export interface TaskRepository {
    add(taskInput: TaskInput): Promise<Task>;
    remove(taskId: string): Promise<void>;
    getUserId(taskId: string): Promise<string | undefined>;
    getOne(taskId: string): Promise<Task>;
    update(taskUpdate: TaskUpdate): Promise<Task>;
}
