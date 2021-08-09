import axios from "axios";


const httpBase = "https://localhost:5001/api/Services";



export async function getRequestedSevices (email){
    const response = await axios.get(`${httpBase}/getRequestedSevices/${email}`);
     return response.data;
  }
 

  export async function getOfferedSevices (email){
    const response = await axios.get(`${httpBase}/getOfferedSevices/${email}`);
     return response.data;
  }