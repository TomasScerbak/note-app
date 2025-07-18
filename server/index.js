import express from "express";
import mysql from "mysql2";
import cors from "cors";
import "dotenv/config";

const app = express();

//Midleware
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

import UserRouter from "./routes/userRoutes.js";
import NoteRouter from "./routes/noteRoutes.js";
app.use("/api/user", UserRouter);
app.use("/api/note", NoteRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default db;
