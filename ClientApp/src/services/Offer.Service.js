import axios from "axios";

const httpBase = "https://localhost:5001/api/Offers";

export async function getAll() {
  const response = await axios.get(`${httpBase}`);
  return response.data;
}

export async function GetOfferByEmail(email) {
  const response = await axios.get(`${httpBase}/GetOfferByEmail/${email}`);
  return response.data;
}

export async function GetOffersBySearch(provinceNum, categoryId) {
  const response = await axios.get(
    `${httpBase}/GetOffersBySearch/${provinceNum}/${categoryId}`
  );
  return response.data;
}
