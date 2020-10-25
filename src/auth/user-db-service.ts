import Knex from 'knex';
import { User } from './user';
import { UserRepository } from './user-repository';

export class UserDbService implements UserRepository {
    private conn: Knex;

    constructor(conn: Knex) {
        this.conn = conn;
    }

    async add(user: User): Promise<void> {
        await this.conn('users').insert(user);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const user = await this.conn<User>('users').where('email', email).first();
        return user;
    }

    async isEmailAlreadyUsed(email: string): Promise<boolean> {
        const result = await this.conn<User>('users').where('email', email).count('email').first();
        const count = typeof result?.count == 'string' ? Number.parseInt(result.count) : 0;

        return count > 0;
    }
}
