"use client";

import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { useQuery } from "@tanstack/react-query";

const fetchMessages = async () => {
  try {
    const response = await axiosInstance.get("/users/getusermsg");
    return response.data.data;
  } catch (error) {
    axiosErrorManager(error)
  }
};

export function useFetchMessages() {
  const {
    data: messages = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
  });

  return {messages,isLoading,isError,error,refetch};
}