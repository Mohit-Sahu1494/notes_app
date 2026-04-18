import axios from "axios";

const API = axios.create({
   baseURL: "https://notesapp-production-b757.up.railway.app/api/v1",
//    baseURL: "https://amusing-cat-production.up.railway.app/api/v1/admin",
  withCredentials: true, 
});

export default API;
