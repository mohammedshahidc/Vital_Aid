"use client";
import React, { useState } from "react";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import HowItWorks from "./howitWork";
import { Box, Pagination } from "@mui/material";

interface Volunteer {
  _id: string;
  name: string;
  phone: number;
  gender: string;
  image: string;
}

interface VolunteersResponse {
  allVolunteers: Volunteer[];
  currentPage: number;
  totalPages: number;
}

const fetchVolunteers = async (page: number): Promise<VolunteersResponse> => {
  const response = await axiosInstance.get(
    `/volunteers/getall?page=${page}&limit=12`
  );
  return response.data;
};

function Volunteers() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useQuery<VolunteersResponse, Error>({
    queryKey: ["Volunteers", page],
    queryFn: () => fetchVolunteers(page),
    staleTime: 5000,
  });

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error fetching volunteers</p>
    );

  return (
    <>
      <HowItWorks />
      <div className="mx-20 p-5 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full ">
          {data?.allVolunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              className="bg-white rounded-xl shadow-lg p-5 flex items-center gap-4 w-full"
            >
              <Image
                src={volunteer.image}
                alt={volunteer.name}
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-blue-500"
              />
              <div className="text-black">
                <p className="text-lg font-semibold">{volunteer.name}</p>
                <p className="text-gray-600">📞 {volunteer.phone}</p>
                <p className="text-gray-600">⚧ {volunteer.gender}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-10">

          <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 3 }}>
            <Pagination
              count={data?.totalPages ?? 1}
              page={data?.currentPage ?? 1}
              onChange={(event, value) => setPage(value)}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
          
        </div>
      </div>
    </>
  );
}

export default Volunteers;
