'use client'
import axiosInstance from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

const fetchdoctorProfile=async()=>{
    const response=await axiosInstance.get('/doctors/getdoctorsprofile')
    return response.data
}

export const useDoctorProfile = () => {
    return useQuery({
        queryKey: ["doctorProfile"],
        queryFn: () => fetchdoctorProfile(),
    });
};

const fetchslots=async()=>{
    const response=await axiosInstance.get('/doctors/getslots') 
    console.log("slots",response.data);
    
    return response.data
}
export const useDoctorSlots = () => {
    return useQuery({
        queryKey: ["doctorSlots"],
        queryFn: () => fetchslots(),
    });
};