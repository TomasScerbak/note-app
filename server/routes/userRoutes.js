import express from "express";
import UsersDAO from "../dao/UsersDAO.js";

const router = express.Router();
// Create a new user
router.post("/", async (req, res) => {
  const { email, uid } = req.body;
  try {
    const user = await UsersDAO.createUser({ email, uid });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
