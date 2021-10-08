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
export async function GetOfferByAuthorId(userId) {
  const response = await axios.get(`${httpBase}/GetOfferByAuthorId/${userId}`);
  return response.data;
}

export async function GetOffersBySearch(searchValue, provinceNum, categoryId) {
  var search = searchValue == "" ? "-1" : searchValue;
  const response = await axios.get(
    `${httpBase}/GetOffersBySearch/${search}/${provinceNum}/${categoryId}`
  );
  return response.data;
}
