import express from "express";
import mysql from "mysql2";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import path from "path";

const app = express();

//Midleware
app.use(express.json());
app.use(
  cors({
    origin: "https://dev-tomo-note-app.netlify.app",
    credentials: true,
  })
);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(path.resolve("cert", "DigiCertGlobalRootCA.crt.pem")),
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

import UserRouter from "./routes/userRoutes.js";
import NoteRouter from "./routes/noteRoutes.js";
app.use("/api/user", UserRouter);
app.use("/api/note", NoteRouter);

// Server Health Check Endpoint
app.get("/api/health-check", async (req, res) => {
  try {
    res.status(200).json({ status: "ok", message: "Backend is awake" });
  } catch (error) {
    console.error("Health check failed:", error.message);
    res.status(500).json({ status: "error", message: "Backend not ready" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default db;
