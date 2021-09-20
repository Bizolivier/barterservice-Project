import axios from "axios";

const httpBase = "https://localhost:5001/api/Prestations";

export async function addPrestation(prestationDTO) {
  await axios.post(`${httpBase}`, {
    IdServiceProvided: prestationDTO.IdServiceProvided,
    IdUserClient: prestationDTO.IdUserClient,
    IdUserProvider: prestationDTO.IdUserProvider,
    Date: prestationDTO.Date,
    Etat: prestationDTO.Etat
  });
}

export async function getNbNotifications(userId) {
  return (await axios.get(`${httpBase}/getNbNotifications/${userId}`)).data;
}

export async function getOrdered(userId) {
  return (await axios.get(`${httpBase}/getOrdered/${userId}`)).data;
}

export async function getProvided(userId) {
  return (await axios.get(`${httpBase}/getProvided/${userId}`)).data;
}
export async function getEtatChanged(id) {
  await axios.put(`${httpBase}/getEtatChanged/${id}`);
}

export async function getPrestDeleted(id) {
  await axios.delete(`${httpBase}/getPrestDeleted/${id}`);
}
export async function PutDate(id, prestationDTO) {
  await axios.put(`${httpBase}/PutDate/${id}`, {
    IdServiceProvided: prestationDTO.IdServiceProvided,
    IdUserClient: prestationDTO.IdUserClient,
    IdUserProvider: prestationDTO.IdUserProvider,
    Date: prestationDTO.Date,
    Etat: prestationDTO.Etat

  });
}

