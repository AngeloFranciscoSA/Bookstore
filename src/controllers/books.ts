import express, { Request, Response } from "express";
import { conn } from "../database/connection";
import { Books } from "../interfaces/books";
import {
  listBooks,
  getBooksById,
  insertBooksToDb,
  putUpdateBooks,
  deleteRemoveBooks,
} from "../models/books";

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

booksController.put("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const books: Books = req.body;
  putUpdateBooks(conn, parseInt(id), books, res);
});

booksController.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  deleteRemoveBooks(conn, parseInt(id), res);
});
