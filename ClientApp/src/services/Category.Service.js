import axios from "axios";

const httpBase = "https://localhost:5001/api/Categories";

export async function getAllCategories() {
  const response = await axios.get(`${httpBase}`);
  return response.data;
}
