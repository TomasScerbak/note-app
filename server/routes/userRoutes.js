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
// Get User ID by UID
router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = { uid };
    const userIdData = await UsersDAO.getUserIdByUID(user);

    if (userIdData) {
      res.status(200).json(userIdData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
