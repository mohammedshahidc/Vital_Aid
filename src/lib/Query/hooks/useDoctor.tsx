"use client";

import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchDoctors = async (page: number) => {
    console.log(page);
    
    const response = await axiosInstance.get(`/doctors/getdoctors?page=${page}&limit=5`);
    return response.data;
};

export const useDoctor = (page: number) => {
    return useQuery({
        queryKey: ["doctors", page],
        queryFn: () => fetchDoctors(page),
    });
};
