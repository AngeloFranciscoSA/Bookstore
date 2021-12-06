import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { conn } from "./database/connection";
import { booksController } from "./controllers/books";
import Migrations from "./database/migrations";

dotenv.config();

if (!process.env.SERVER_PORT) {
  throw new Error("PORT is not defined");
}

conn.connect((err) => {
  if (err) throw new Error("Error connecting to database");

  console.log("Database connected...");

  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  new Migrations(conn);

  app.use("/", booksController);

  const PORT = process.env.SERVER_PORT;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
