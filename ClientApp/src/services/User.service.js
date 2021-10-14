import axios from "axios";

const AUTH_TOKEN = ""
const httpBase = "https://localhost:5001/api/Users";

export async function getAll() {
  const response = await axios.get(`${httpBase}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}

export async function getUsersWithRoleUser() {
  const response = await axios.get(`${httpBase}/getUsersWithRoleUser`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}
export async function deleteUser(userId) {
  await axios.delete(` ${httpBase}/deleteUser/${userId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } })
}

export async function usersToChat(email) {
  const response = await axios.get(`${httpBase}/usersToChat/${email}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}

export async function connect(userDTO) {
  const response = await axios.put(`${httpBase}/connect`, {
    Nickname: userDTO.nickname,
    FullName: userDTO.fullname,
    Email: userDTO.email,
    Province: userDTO.province,
    Picture: userDTO.picture,
    Sexe: userDTO.sexe,

  });
  if (response.data && response.data.token) {
    //Je sauvegarde le token dans le local storage
    localStorage.setItem("userToken", response.data.token);
  }

  return response.data;
}

export async function PutUser(email, userDTO) {
  await axios.put(`${httpBase}/PutUser/${email}`, {
    Nickname: userDTO.nickname,
    FullName: userDTO.fullname,
    Email: userDTO.email,
    Province: userDTO.province,
    Sexe: userDTO.sexe,
    Role: userDTO.role
  }, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}

export async function GetOneByEmail(email) {
  const response = await axios.get(`${httpBase}/GetOneByEmail/${email}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}

export async function GetOneById(authorId) {
  const response = await axios.get(`${httpBase}/GetOne/${authorId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
  return response.data;
}
