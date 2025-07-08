import axios from "axios";

export const fetchUserId = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user/${uid}`);
    if (response.status === 200) {
      return response.data[0]?.id;
    }
  } catch (error) {
    console.error(error);
  }
};
