import { TaskList, TaskListInput } from './task-list';

export interface TaskListRepository {
    getUserId(taskListId: string): Promise<string | undefined>;
    remove(taskListId: string): Promise<void>;
    rename(newName: string, taskListId: string): Promise<TaskList>;
    add(taskListInput: TaskListInput): Promise<TaskList>;
    getOne(taskListId: string): Promise<TaskList>;
    getAll(userId: string): Promise<TaskList[]>;
}
