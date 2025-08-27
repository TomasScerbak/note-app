import axios from "axios";

const BASE_URL = "https://note-app-v05l.onrender.com/api/user";

export const fetchUserId = async (uid) => {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}`);
    if (response.status === 200) {
      return response.data[0]?.id;
    }
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    throw new Error("Failed to fetch user ID");
  }
};
