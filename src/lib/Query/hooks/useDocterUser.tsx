"use client" 
import axiosInstance from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
 
const fetchDoctors= async()=>{
    return axiosInstance.get("/doctors/getAllDoctors")
}


export const useDoctorUser=()=>{
     const {data:doctors}=useQuery({
        queryKey:["doctor"],
        queryFn:fetchDoctors
     })
     return {doctors}
}
 