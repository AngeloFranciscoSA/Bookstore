import { ErrorRequestHandler, Response } from "express";
import Mysql from "mysql";
import { Books } from "../interfaces/books";

export const createTableBooks = (): string => {
  return `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title TEXT,
        department TEXT,
        public_year INTEGER,
        author TEXT,
        description TEXT,
        image TEXT,
        price REAL,
        quantity INTEGER
    )`;
};

const selectAllBooks = (): string => {
  return `SELECT * FROM books`;
};

const selectBooksById = (id: number): string => {
  return `SELECT * FROM books WHERE id = ${id}`;
};

const insertBooks = (books: Books): string => {
  return `INSERT INTO books (title, department, public_year, author, description, image, price, quantity)
    VALUES ('${books.title}', '${books.department}', '${books.public_year}', '${books.author}', '${books.description}', '${books.image}', '${books.price}', '${books.quantity}')`;
};

export const listBooks = (conn: Mysql.Connection, res: Response) => {
  conn.query(
    selectAllBooks(),
    (err: ErrorRequestHandler, results: ErrorRequestHandler) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
}

export const insertBooksToDb = (conn: Mysql.Connection, books: Books, res: Response) => {
  conn.query(
    insertBooks(books),
    (err: ErrorRequestHandler, results: ErrorRequestHandler) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
}