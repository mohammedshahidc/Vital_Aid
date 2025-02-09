"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

const fetchEvents = async () => {
  const response = await axiosInstance('/events/getAllevents');
  console.log('Fetched Events:', response.data);
  return response.data;
};

export default function useEvents() {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents
  });

  return { events, isLoading, error };
}
