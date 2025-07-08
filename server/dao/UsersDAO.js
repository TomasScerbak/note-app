import db from "../index.js";

class UsersDAO {
  static async createUser(user) {
    const { email, uid } = user;
    const sql = "INSERT INTO users (email, uid) VALUES (?, ?)";
    const values = [email, uid];
    try {
      const [result] = await db.query(sql, values);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async getUserIdByUID(user) {
    const { uid } = user;
    const sql = "SELECT id FROM users WHERE uid = ?";
    const value = [uid];
    try {
      const [result] = await db.query(sql, value);
      return result;
    } catch (error) {
      console.error("Error getting user by UID:", error);
      throw error;
    }
  }
}

export default UsersDAO;
