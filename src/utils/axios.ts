import axios from "axios";
//import Cookies from 'js-cookie';

const axiosInstance = axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;