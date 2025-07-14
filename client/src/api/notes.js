import axios from "axios";

const BASE_URL = "http://localhost:5000/api/note";

// Create Note
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${BASE_URL}`, note);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

// Update Note
export const updateNote = async (note) => {
  try {
    const response = await axios.put(`${BASE_URL}/${note.id}`, note);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

// Fetch Single Note by Note ID
export const getNoteById = async (noteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/note/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    throw error;
  }
};

// Fetch All Notes by User ID
export const getNotesByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes by user ID:", error);
    throw error;
  }
};
