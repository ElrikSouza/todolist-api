export enum TaskProgress {
    TODO = 0,
    DOING = 1,
    DONE = 2,
}

export interface Task {
    id?: string;
    user_id: string;
    task_list_id: string;
    name: string;
    description?: string;
    scheduled_to?: Date | number | string;
    progress: TaskProgress;
    created_at: string;
}

export type TaskInput = Exclude<Task, 'created_at' | 'progress'>;
export interface TaskUpdate extends Partial<Exclude<Task, 'task_list_id'>> {
    id: string;
    user_id: string;
}
