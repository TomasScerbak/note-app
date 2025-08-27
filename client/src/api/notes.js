import axios from "axios";

const BASE_URL = "https://note-app-v05l.onrender.com";

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

// Delete Note
export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/note/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

// Toggle is_archived status of a note
export const toggleArchiveStatus = async (noteId, isArchived) => {
  try {
    const response = await axios.patch(`${BASE_URL}/note/${noteId}/archive`, { currentState: isArchived });
    return response.data;
  } catch (error) {
    console.error("Error toggling archive status:", error);
    throw error;
  }
};
