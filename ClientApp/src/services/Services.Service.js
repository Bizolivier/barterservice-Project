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
export async function getSingleOfferedSevices(email, servId) {
  const res = await axios.get(`${httpBase}/getSingleOfferedSevices/${email}/${servId}`);
  return res.data;
}

export async function addService(titleService, catsel, offerId, isRequest) {
  await axios.post(`${httpBase}`, {

    Title: titleService,
    OfferLinkedtoServiceId: offerId,
    CategoryLinkToId: catsel,
    IsRecherche: isRequest
  });
}

export async function deleteService(serviceId) {
  await axios.delete(` ${httpBase}/deleteService/${serviceId}`)
}
