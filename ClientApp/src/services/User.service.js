import axios from "axios";

const httpBase = "https://localhost:5001/api/Users";
export async function connect (email){
   await axios.get(`${httpBase}/connect/${email}`);
    
}
export async function PutUser (userId,userDTO){
    await axios.put(`${httpBase}/PutUser/${userId}`,userDTO)
}
export async function GetOne(userId){
    await axios.get(`${httpBase}/${userId}`)
     
}
