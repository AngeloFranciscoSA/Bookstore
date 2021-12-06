import mysql from 'mysql';
import { configs } from './config';

export const conn = mysql.createConnection({
    host: configs.database.host,
    user: configs.database.user,
    password: configs.database.password,
    database: configs.database.database
});
