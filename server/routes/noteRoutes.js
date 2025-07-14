import express from "express";
import NotesDAO from "../dao/NotesDAO.js";

const router = express.Router();

// Create a new note
router.post("/", async (req, res) => {
  const { header, content, tags, userId } = req.body;
  try {
    const note = await NotesDAO.createNote({ header, content, tags, userId });
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update an existing note
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { header, content, tags } = req.body;

  const note = { id, header, content, tags };

  try {
    const updatedNote = await NotesDAO.updateNote(note);

    if (updatedNote.affectedRows > 0) {
      res.status(200).json({ message: "Note updated successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all notes for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notes = await NotesDAO.getNotesByUserId(userId);
    if (notes) {
      res.status(200).json(notes);
    } else {
      res.status(404).json({ message: "No notes found for this user" });
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
