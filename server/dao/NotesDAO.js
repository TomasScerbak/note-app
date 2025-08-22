import db from "../index.js";

class NotesDAO {
  static async createNote(note) {
    const { header, content, tags, userId } = note;
    const sql = "INSERT INTO notes (header, content, tags, user_id) VALUES (?, ?, ?, ?)";
    const values = [header, content, tags, userId];
    try {
      const [result] = await db.query(sql, values);
      const noteId = result.insertId;

      const [rows] = await db.query("SELECT * FROM notes WHERE id = ? LIMIT 1", [noteId]);
      const savedNote = rows[0];

      return savedNote;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  }

  static async getNotesByUserId(userId) {
    const sql = "SELECT * FROM notes WHERE user_id = ?";
    const value = [userId];
    try {
      const [result] = await db.query(sql, value);
      return result;
    } catch (error) {
      console.error("Error getting notes by user ID:", error);
      throw error;
    }
  }

  static async getNoteById(noteId) {
    const sql = "SELECT * FROM notes WHERE id = ? LIMIT 1";
    const value = [noteId];
    try {
      const [rows] = await db.query(sql, value);
      return rows[0];
    } catch (error) {
      console.error("Error fetching note by ID:", error);
      throw error;
    }
  }

  static async updateNote(note) {
    const { id, header, content, tags } = note;
    const sql = "UPDATE notes SET header = ?, content = ?, tags = ? WHERE id = ?";
    const values = [header, content, tags, id];
    try {
      const [result] = await db.query(sql, values);
      return result;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  static async deleteNote(noteId) {
    const sql = "DELETE FROM notes WHERE id = ?";
    const value = [noteId];
    try {
      const [result] = await db.query(sql, value);
      return result;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  static async toggleArchive(noteId, currentState) {
    const newState = currentState ? 1 : 0; // ✅ must be number!
    const sql = "UPDATE notes SET is_archived = ? WHERE id = ?";
    const values = [newState, noteId];
    try {
      const [result] = await db.query(sql, values);
      return result;
    } catch (error) {
      console.error("Error toggling archive status:", error);
      throw error;
    }
  }
}

export default NotesDAO;
