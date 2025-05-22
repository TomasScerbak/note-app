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

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ message: "Database connection successful!", result: rows[0].result });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
});

import UserRouter from "./routes/userRoutes.js";
app.use("/", UserRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default db;
