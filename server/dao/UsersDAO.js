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
}

export default UsersDAO;
