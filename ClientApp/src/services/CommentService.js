import axios from "axios";

const httpBase = "https://localhost:5001/api/Comments";

export async function getAll() {
  const response = await axios.get(`${httpBase}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}

export async function GetCommentsByServiceId(serviceId) {
  const response = await axios.get(
    `${httpBase}/GetCommentsByServiceId/${serviceId}`
  );
  return response.data;
}
export async function addComment(commentDTO) {
  await axios.post(`${httpBase}/addComment`, {
    Description: commentDTO.Description,
    AuthorId: commentDTO.AuthorId,
    ServiceLinkedToId: commentDTO.ServiceLinkedToId,
    ReceiverId: commentDTO.ReceiverId,
    Date: commentDTO.Date,
    Rating: commentDTO.Rating
  }, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}
export async function deleteComment(commentId) {
  await axios.delete(`${httpBase}/deleteComment/${commentId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } })
}
export async function addAnswerToComment(commentId, answer) {
  await axios.put(`${httpBase}/addAnswerToComment/${commentId}/${answer}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } })
}
