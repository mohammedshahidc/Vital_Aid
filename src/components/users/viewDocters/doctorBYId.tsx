"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById } from "@/lib/Query/hooks/doctorById";
import Image from "next/image";

interface DoctorInfo {
  email: string;
  name: string;
  phone: string;
  _id: string;
}

interface DoctorData {
  description: string;
  doctor: DoctorInfo;
  profileImage: string;
  qualification: string[];
  specialization: string[];
  hospital: string;
  address: string;
}

export default function Doctor() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery<DoctorData>({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="text-center text-xl py-10">Loading doctor details...</div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Error fetching doctor details: {(error as Error).message}
      </div>
    );

  if (!data)
    return (
      <div className="text-center text-gray-500 py-10">
        No doctor details found
      </div>
    );

  return (
    <>
      <div className="w-full min-h-[85vh] bg-gray-100 flex flex-col items-center p-8 relative">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="md:w-1/3  mt-8 flex justify-center">
            <Image
              src={data.profileImage}
              alt="Doctor Profile"
              width={200}
              height={200}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>

          <div className="md:w-2/3 mt-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {data.doctor.name}
            </h1>

            <div className="text-xl text-pink-600 font-medium mt-2 max-w-sm break-words text-center md:text-left">
              {data.specialization.map((spec, idx) => (
                <p key={idx} className="leading-snug">
                  {spec}
                </p>
              ))}
            </div>

            <p className="text-lg text-pink-600 font-medium mt-1">
              {data.hospital}
            </p>

            <div className="mt-4">
              <button className="bg-red-950 hover:bg-red-900 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all duration-300">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          About
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {data.description}
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4">
          Qualifications
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
          {data.qualification.map((qual, index) => (
            <li key={index}>{qual}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
