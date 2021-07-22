import axios from "axios";

const httpBase = "https://localhost:5001/api/Users";
export async function connect (email){
    await axios.get(`${httpBase}/connect/${email}`);

}