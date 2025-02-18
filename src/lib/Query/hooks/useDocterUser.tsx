"use client";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchDoctors = async () => {
  return axiosInstance.get("/doctors/getAllDoctors");
};

export const useDoctorUser=()=>{
     const {data:doctors}=useQuery({
        queryKey:["doctor"],
        queryFn:fetchDoctors
     })
     return {doctors}
}

const fetchDoctorById=async(id:string)=>{
    const response=await axiosInstance.get(`/doctors/getdetail/${id}`)
    return response.data
}

export const useDoctobyId = (id:string) => {
    return useQuery({
        queryKey: ["doctor", id],
        queryFn: () =>fetchDoctorById(id),
    });
};


 