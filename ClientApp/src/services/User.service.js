import axios from "axios";

const httpBase = "https://localhost:5001/api/Users";
export async function connect (email){

  const response = await axios.get(`${httpBase}/connect/${email}`);
  return response.data;
    
}
export async function PutUser (email,userDTO){
    await axios.put(`${httpBase}/PutUser/${email}`,userDTO)
}
export async function GetOneByEmail(email){
     const response = await axios.get(`${httpBase}/GetOneByEmail/${email}`);
       return response.data;
     
}
