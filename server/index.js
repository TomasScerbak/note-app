import express from "express";
import mysql from "mysql2";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import path from "path";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

//Midleware
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "https://dev-tomo-note-app.netlify.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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

if (isProduction) {
  pool.ssl = {
    ca: fs.readFileSync(path.resolve("cert", "DigiCertGlobalRootCA.crt.pem")),
  };
}

const db = pool.promise();

import UserRouter from "./routes/userRoutes.js";
import NoteRouter from "./routes/noteRoutes.js";
app.use("/api/user", UserRouter);
app.use("/api/note", NoteRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default db;
