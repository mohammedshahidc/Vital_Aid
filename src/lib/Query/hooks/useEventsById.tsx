"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string[];
  location: string;
  organization: string;
  isDeleted: boolean;
}

const fetchEventById = async (id: string): Promise<{ event: Event }> => {
  const response = await axiosInstance.get<{ event: Event }>(
    `/events/geteventbyid/${id}`
  );
  console.log("Fetched Event:", response.data);
  return response.data;
};

export default function useEventById(id: string): UseQueryResult<{
    isDeleted: boolean; event: Event 
}, Error> {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
    enabled: !!id,
  });
}
