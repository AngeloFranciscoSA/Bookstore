import express, { query, Request, Response } from "express";
import { conn } from "../database/connection";
import { Books } from "../interfaces/books";
import { insertBooksToDb, listBooks, getBooksById } from "../models/books";

export const booksController = express.Router();

booksController.get("/", (req: Request, res: Response) => {
    listBooks(conn, res);
});

booksController.post("/", (req: Request, res: Response) => {
  const books: Books = req.body;
  insertBooksToDb(conn, books, res);
});

booksController.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    getBooksById(conn, parseInt(id), res);
});