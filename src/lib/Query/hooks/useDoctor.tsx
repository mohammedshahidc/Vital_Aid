"use client";

import axiosInstance from "@/utils/axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";


interface Doctor {
    name: string;
  }
  
  interface Speciality {
    specialization: string;
  }
  
  interface SearchDoctorsResponse {
    doctors: Doctor[];
    specialties: Speciality[];
  }
const fetchDoctors = async (page: number,limit:number) => {
    const response = await axiosInstance.get(`/doctors/getdoctors?page=${page}&limit=${limit}`);
    return response.data;
};

export const useDoctor = (page: number,limit:number) => {
    return useQuery({
        queryKey: ["doctors", page],
        queryFn: () => fetchDoctors(page,limit),
    });
};

const fetchSearchDetails = async (): Promise<SearchDoctorsResponse> => {
    const { data } = await axiosInstance.get<SearchDoctorsResponse>("/doctors/searchDoctors");
    return data;
  };
  
  export const useFetchDetails = (): UseQueryResult<SearchDoctorsResponse, Error> => {
    return useQuery({
      queryKey: ["doctors"],
      queryFn: fetchSearchDetails,
      staleTime: 5 * 60 * 1000,
    });
  };