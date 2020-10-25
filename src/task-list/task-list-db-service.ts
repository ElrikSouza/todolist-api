import Knex from 'knex';
import { TaskList, TaskListInput } from './task-list';
import { TaskListRepository } from './task-list-repository';

const TABLE_NAME = 'task_lists';
export class TaskListDbService implements TaskListRepository {
    private conn: Knex;

    constructor(conn: Knex) {
        this.conn = conn;
    }

    public add = async (taskListInput: TaskListInput): Promise<TaskList> => {
        const [result] = await this.conn(TABLE_NAME).insert(taskListInput).returning('*');
        return result;
    };

    public rename = async (newName: string, taskListId: string): Promise<TaskList> => {
        const [result] = await this.conn(TABLE_NAME)
            .where('id', taskListId)
            .update({ name: newName })
            .limit(1)
            .returning('*');

        return result;
    };

    public remove = async (taskListId: string): Promise<void> => {
        await this.conn(TABLE_NAME).where('id', taskListId).delete().limit(1);
    };

    public getUserId = async (taskListId: string): Promise<string | undefined> => {
        const result = await this.conn<TaskList>(TABLE_NAME).where('id', taskListId).select('user_id').first();
        return result?.user_id;
    };

    public getOne = async (taskListId: string): Promise<TaskList> => {
        const {
            rows,
        } = await this.conn.raw(
            `select list.id, list.user_id, list.name, json_agg(to_jsonb(t) - 'user_id' - 'task_list_id') as tasks from task_lists list inner join tasks t on list.id = t.task_list_id  where list.id = ? group by list.id;`,
            [taskListId],
        );

        return rows[0];
    };

    public getAll = async (userId: string): Promise<TaskList[]> => {
        const result = await this.conn<TaskList>(TABLE_NAME).select('*').where('user_id', userId);
        return result;
    };
}
