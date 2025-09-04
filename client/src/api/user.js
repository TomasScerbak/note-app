import axios from "axios";

const isProduction = import.meta.env.MODE === "production";

const BASE_URL = isProduction
  ? "https://note-app-v05l.onrender.com/api/user"
  : import.meta.env.VITE_USERS_BASE_URL;

export const fetchUserId = async (uid) => {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}`);
    const data = response.data;
    if (Array.isArray(data) && !data.length) {
      return null;
    }
    const userId = data[0]?.id;
    return userId;
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    throw new Error("Failed to fetch user ID");
  }
};
