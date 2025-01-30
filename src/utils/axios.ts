
import axios from "axios";
import Cookies from 'js-cookie';


const token= Cookies.get("accessToken");

console.log(token);
const axiosInstance=axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export default axiosInstance;