"use client"

import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchDoctor=()=>{
    return axiosInstance.get("/doctors/getdoctors")
}

export const useDoctor=()=>{
    const {data:doctor} = useQuery({
        queryKey:["doctors"],
        queryFn:fetchDoctor
    })
    return {doctor};
}