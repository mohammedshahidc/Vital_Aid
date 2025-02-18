"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";

const fetchReports = async (id: string) => {
  const response = await axiosInstance.get(`/users/getreportof/${id}`);
  return response.data;
};

export function useFetchreport(id: string) {
  const { data: reports = [] } = useQuery({
    queryKey: ["report", id],
    queryFn: () => fetchReports(id),
    enabled: !!id,
  });
  return { reports };
}

const fetchDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/users/getdetails/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    axiosErrorManager(error);
    throw new Error("Failed to fetch user details");
  }
};

export function useFetchDetails(id: string) {
  const {
    data: details = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["details", id],
    queryFn: () => fetchDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return { details, isLoading, isError, error };
}
