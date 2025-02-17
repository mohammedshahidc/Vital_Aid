
"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import React, { useState } from "react";
import Image from "next/image";
import HowItWorks from "./Howitwork";

export interface Donor {
  _id: string;
  name: string;
  BloodGroup: string;
  Phone: number;
  image: string[];
}

export interface DonorResponse {
  error: string;
  donors: Donor[];
  totalPages: number;
  totaldonor: number;
  currentPage: number;
}

const fetchDonors = async (page: number): Promise<DonorResponse> => {
  const response = await axiosInstance.get<DonorResponse>(
    `/donors/getDonors?page=${page}&limit=9`
  );
  return response.data;
};

const DonorsList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");

  const { data, isLoading, error } = useQuery<DonorResponse, Error>({
    queryKey: ["donors", page],
    queryFn: () => fetchDonors(page),
    staleTime: 5000,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBloodGroup(e.target.value);
  };

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching donors</p>;

  const filteredDonors = data?.donors?.filter((donor) => {
    return (
      (filter === "" || donor.name.toLowerCase().includes(filter.toLowerCase())) &&
      (selectedBloodGroup === "" || donor.BloodGroup === selectedBloodGroup)
    );
  });

  return (
    <div className="max-w-full mx-auto p-5 w-full">
     <HowItWorks/>

      <div className="mb-6 flex mt-3 justify-center gap-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={filter}
          onChange={handleFilterChange}
        />

        <select
          value={selectedBloodGroup}
          onChange={handleBloodGroupChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
        {filteredDonors?.map((donor: Donor) => (
          <div
            key={donor._id}
            className="p-4 bg-white shadow-xl rounded-lg flex space-x-4 items-center border border-gray-200 w-full transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {donor.image.length > 0 ? (
              <Image
                src={donor.image[0]}
                alt={donor.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <div className="flex flex-col justify-between flex-grow">
              <h2 className="text-xl font-medium text-gray-900">{donor.name}</h2>
              <p className="text-sm text-gray-600">Blood Group: {donor.BloodGroup}</p>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Phone: {donor.Phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Prev
        </button>

        <span className="text-lg font-bold text-gray-800">
          Page {data?.currentPage ?? 1} of {data?.totalPages ?? 1}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              (data?.currentPage ?? 1) < (data?.totalPages ?? 1)
                ? prev + 1
                : prev
            )
          }
          disabled={(data?.currentPage ?? 1) >= (data?.totalPages ?? 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
      

    </div>
  );
};

export default DonorsList;
