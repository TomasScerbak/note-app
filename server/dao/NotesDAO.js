import db from "../index.js";

class NotesDAO {
  static async createNote(note) {
    const { header, content, tags, userId } = note;
    const sql = "INSERT INTO notes (header, content, tags, user_id) VALUES (?, ?, ?, ?)";
    const values = [header, content, tags, userId];
    try {
      const [result] = await db.query(sql, values);
      return result;
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
}

export default NotesDAO;
