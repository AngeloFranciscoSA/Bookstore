import Mysql from "mysql";
import { ErrorRequestHandler } from "express";
import { createTableBooks } from "../models/books";

export default class Migrations {
    conn: Mysql.Connection;
    constructor(conn: Mysql.Connection){
        this.conn = conn;
        this.init();
    }

    init(){
        this.conn.query(createTableBooks(), (err: ErrorRequestHandler) => {
            if (err) throw err;
        });
    }
}