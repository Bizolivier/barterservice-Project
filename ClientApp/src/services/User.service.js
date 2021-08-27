import axios from "axios";

const httpBase = "https://localhost:5001/api/Users";

export async function getAll() {
  const response = await axios.get(`${httpBase}`);
  return response.data;
}

export async function connect(userDTO) {
  const response = await axios.put(`${httpBase}/connect`, {
    Nickname: userDTO.nickname,
    FullName: userDTO.fullname,
    Email: userDTO.email,
    Province: userDTO.province,
    Picture: userDTO.picture,
    Sexe: userDTO.sexe
  });
  return response.data;
}

export async function PutUser(email, userDTO) {
  await axios.put(`${httpBase}/PutUser/${email}`, {
    Nickname: userDTO.nickname,
    FullName: userDTO.fullname,
    Email: userDTO.email,
    Province: userDTO.province,
    Sexe: userDTO.sexe
  });
}

export async function GetOneByEmail(email) {
  const response = await axios.get(`${httpBase}/GetOneByEmail/${email}`);
  return response.data;
}

export async function GetOneById(authorId) {
  const response = await axios.get(`${httpBase}/${authorId}`);
  return response.data;
}
