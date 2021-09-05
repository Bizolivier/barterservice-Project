import axios from "axios";

const httpBase = "https://localhost:5001/api/Comments";

export async function getAll() {
  const response = await axios.get(`${httpBase}`);
  return response.data;
}

export async function GetCommentsByServiceId(serviceId) {
  const response = await axios.get(
    `${httpBase}/GetCommentsByServiceId/${serviceId}`
  );
  return response.data;
}
