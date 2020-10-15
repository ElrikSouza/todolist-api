import Knex from 'knex';
import { CONNECTION_STRING } from './env';

export const db = Knex({
    client: 'pg',
    connection: CONNECTION_STRING,
});
