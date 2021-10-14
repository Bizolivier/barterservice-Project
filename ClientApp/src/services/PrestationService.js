import axios from "axios";

const httpBase = "https://localhost:5001/api/Prestations";

export async function addPrestation(prestationDTO) {
  await axios.post(`${httpBase}`, {
    IdServiceProvided: prestationDTO.IdServiceProvided,
    IdUserClient: prestationDTO.IdUserClient,
    IdUserProvider: prestationDTO.IdUserProvider,
    Date: prestationDTO.Date,
    Etat: prestationDTO.Etat
  }, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}
export async function getNbNotifications(userId) {
  return (await axios.get(`${httpBase}/getNbNotifications/${userId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } })).data;
}

export async function getOrdered(userId) {
  return (await axios.get(`${httpBase}/getOrdered/${userId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } })).data;
}

export async function getProvided(userId) {
  return (await axios.get(`${httpBase}/getProvided/${userId}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } })).data;
}
export async function getEtatChanged(id, prestationDTO) {
  await axios.put(`${httpBase}/getEtatChanged/${id}`, {
    IdServiceProvided: prestationDTO.idServiceProvided,
    IdUserClient: prestationDTO.idUserClient,
    IdUserProvider: prestationDTO.idUserProvider,
    Date: prestationDTO.date,
    Etat: prestationDTO.etat

  }, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}

export async function getPrestDeleted(id) {
  await axios.delete(`${httpBase}/getPrestDeleted/${id}`, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}
export async function PutDate(id, prestationDTO) {
  await axios.put(`${httpBase}/PutDate/${id}`, {
    IdServiceProvided: prestationDTO.IdServiceProvided,
    IdUserClient: prestationDTO.IdUserClient,
    IdUserProvider: prestationDTO.IdUserProvider,
    Date: prestationDTO.Date,
    Etat: prestationDTO.Etat

  }, { headers: { "Authorization": `Bearer ${localStorage.getItem("userToken")}` } });
}

