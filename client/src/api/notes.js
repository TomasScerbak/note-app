import axios from "axios";

export const createNote = async (note) => {
  try {
    const response = await axios.post("http://localhost:5000/api/note", note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const getNotesByUserId = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/note/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
