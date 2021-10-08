import axios from "axios";

const httpBase = "https://localhost:5001/api/Chats";

export async function getAll() {
  const response = await axios.get(`${httpBase}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}

export async function getChatByUsers(userId1, userId2) {
  const response = await axios.get(
    `${httpBase}/getChatByUsers/${userId1}/${userId2}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } }
  );
  return response.data;
}

export async function addMessage(messageDTO, userId2) {
  await axios.post(`${httpBase}/addMessage/${userId2}`, {
    Content: messageDTO.Content,
    Date: messageDTO.Date,
    SenderId: messageDTO.SenderId
  }, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}
