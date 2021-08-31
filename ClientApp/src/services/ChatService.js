import axios from "axios";

const httpBase = "https://localhost:5001/api/Chats";

export async function getAll() {
  const response = await axios.get(`${httpBase}`);
  return response.data;
}

export async function getChatByUsers(userId1, userId2) {
  const response = await axios.get(
    `${httpBase}/getChatByUsers/${userId1}/${userId2}`
  );
  return response.data;
}
