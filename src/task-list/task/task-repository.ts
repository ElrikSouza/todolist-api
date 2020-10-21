import { Task, TaskInput } from './task';

export interface TaskRepository {
    add(taskInput: TaskInput): Promise<Task>;
    remove(taskId: string): Promise<void>;
    getUserId(taskId: string): Promise<string | undefined>;
}
