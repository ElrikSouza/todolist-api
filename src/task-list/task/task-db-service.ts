import Knex from 'knex';
import { Task, TaskInput, TaskUpdate } from './task';
import { TaskRepository } from './task-repository';

const TABLE_NAME = 'tasks';
export class TaskDbSerivce implements TaskRepository {
    private conn: Knex;

    constructor(conn: Knex) {
        this.conn = conn;
    }

    public add = async (taskInput: TaskInput): Promise<Task> => {
        const [result] = await this.conn<Task>(TABLE_NAME).insert(taskInput).returning('*');
        return result;
    };

    public remove = async (taskId: string): Promise<void> => {
        await this.conn(TABLE_NAME).where('id', taskId).limit(1).delete();
    };

    public getUserId = async (taskId: string): Promise<string | undefined> => {
        const result = await this.conn<Task>(TABLE_NAME).select('user_id').where('id', taskId).first();
        return result?.user_id;
    };

    public getOne = async (taskId: string): Promise<Task> => {
        const [result] = await this.conn<Task>(TABLE_NAME).select('*').where('id', taskId);
        return result;
    };

    public update = async (taskUpdate: TaskUpdate): Promise<Task> => {
        const [result] = await this.conn<Task>(TABLE_NAME)
            .where('id', taskUpdate.id)
            .update(taskUpdate)
            .returning('*')
            .limit(1);

        return result;
    };
}
