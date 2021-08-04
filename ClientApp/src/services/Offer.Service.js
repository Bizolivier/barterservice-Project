import axios from 'axios';

const httpBase = "https://localhost:5001/api/Offers";


export async function getAll(){
    
        const response  = await axios.get(`${httpBase}`);
        return response.data;
    
   
};
