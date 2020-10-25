export interface TaskList {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
}

export type TaskListInput = Exclude<TaskList, 'created_at'>;
