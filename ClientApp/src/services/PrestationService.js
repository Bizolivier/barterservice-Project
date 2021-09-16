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
