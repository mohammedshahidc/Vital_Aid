"use client";
import React, { useState } from "react";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaPhoneAlt, FaRegHandshake, FaUsers } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col items-center py-10 w-full">

      <div className="w-full max-w-3xl text-center p-6 rounded-lg  mb-8">
        <h2 className="text-3xl font-bold text-blue-900">
          Need Volunteer Support?
        </h2>
        <p className="text-gray-700 mt-3">
          Our volunteers are here to help! Get the assistance you need—quickly
          and easily.
        </p>
        <h3 className="text-xl font-semibold text-blue-800 mt-4">
          How to Get Support?
        </h3>
        <div className="flex flex-wrap justify-center gap-6 text-left mx-auto max-w-lg mt-4">
          <div className="flex items-center gap-2">
            <FaUsers className="text-blue-600" />
            <span>Browse our volunteers.</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-600" />
            <span>Contact them directly.</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegHandshake className="text-blue-600" />
            <span>Get the support you need.</span>
          </div>
        </div>
        <p className="text-gray-800 font-medium mt-4">
          Urgent?{" "}
          <span className="text-blue-700">Call us at 123-456-7890.</span>
        </p>
      </div>

      <h2 className="text-4xl font-bold text-white mb-8">Volunteers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-8">
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
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold shadow-md transition hover:bg-blue-600 hover:text-white disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(data?.totalPages ?? 1)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
              page === index + 1
                ? "text-black"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setPage((prev) =>
              (data?.currentPage ?? 1) < (data?.totalPages ?? 1)
                ? prev + 1
                : prev
            )
          }
          disabled={(data?.currentPage ?? 1) >= (data?.totalPages ?? 1)}
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold shadow-md transition hover:bg-blue-600 hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Volunteers;
