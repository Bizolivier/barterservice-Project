import axios from "axios";

const httpBase = "https://localhost:5001/api/Services";

export async function getRequestedSevices(email) {
  const response = await axios.get(`${httpBase}/getRequestedSevices/${email}`);
  return response.data;
}

export async function getOfferedSevices(email) {
  const response = await axios.get(`${httpBase}/getOfferedSevices/${email}`);
  return response.data;
}

export async function addService(serviceDTO) {
  await axios.post(`${httpBase}`, {
    Title: serviceDTO.title,
    OfferLinkedtoServiceId: serviceDTO.offerLinkedtoServiceId,
    CategoryLinkToId: serviceDTO.categoryLinkToId,
    IsRecherche: serviceDTO.isRecherche
  });
}
