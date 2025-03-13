"use client";

import React, { useState } from "react";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import HowItWorks from "./howitWork";
import { Box, Pagination } from "@mui/material";
import Spinner from "@/components/ui/spinner";

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

  const handleCall = (phoneNumber: number) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-red-500 text-lg font-medium">
          Error fetching volunteers. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
  
      <div className="relative">
        <Image
          src="https://i.pinimg.com/736x/2b/1a/20/2b1a203e424aa81c9060ebadccd87bc3.jpg"
          alt="Volunteers Banner"
          width={1920}
          height={600}
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Amazing Volunteers
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Meet the dedicated individuals who make our mission possible
            </p>
          </div>
        </div>
      </div>

      <HowItWorks />

      <section className="container mx-auto px-4 py-12">
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto md:mx-12">
          {data?.allVolunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-4 flex flex-col items-center">
                <div className="mb-4">
                  <Image
                    src={volunteer.image}
                    alt={volunteer.name}
                    width={120}
                    height={120}
                    className="rounded-full h-32 w-32 object-cover border-4 border-blue-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {volunteer.name}
                  </h3>
                  <p className="text-gray-600 flex items-center justify-center gap-2 mb-1">
                    <span>📞</span> {volunteer.phone}
                  </p>
                  <p className="text-gray-600 flex items-center justify-center gap-2">
                    <span>⚧</span> {volunteer.gender}
                  </p>
                </div>
              </div>
              <div 
                className="bg-blue-500 hover:bg-blue-600 text-white text-center py-3 mt-2 cursor-pointer transition-colors duration-300"
                onClick={() => handleCall(volunteer.phone)}
              >
                <button className="font-medium flex items-center justify-center gap-2 w-full">
                  Contact Now
                </button>
              </div>
            </div>
          ))}
        </div>

      
        <div className="flex justify-center mt-12">
          <Box>
            <Pagination
              count={data?.totalPages ?? 1}
              page={data?.currentPage ?? 1}
              onChange={(event, value) => setPage(value)}
              color="primary"
              variant="outlined"
              shape="rounded"
              size="large"
            />
          </Box>
        </div>
      </section>
    </div>
  );
}

export default Volunteers;