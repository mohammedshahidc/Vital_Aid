"use client";

import React from "react";
import { useDoctorUser } from "@/lib/Query/hooks/useDocterUser";
import Link from "next/link";
import Image from "next/image";

interface Doctor {
  description: string;
  doctor: {
    email: string;
    name: string;
    phone: string;
    _id: string;
  };
  _id: string;
  profileImage: string;
  qualification: string[];
  specialization: string[];
}

function DoctorList() {
  const { doctors } = useDoctorUser();
  console.log(doctors, 'hfjnd');

  const doctorList: Doctor[] = Array.isArray(doctors?.data?.data)
    ? doctors.data?.data
    : [];

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-3xl font-medium text-center mb-8 text-red-950">
        Meet Our Doctors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {doctorList.length > 0 ? (
          doctorList.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-white  border border-gray-200"
            >
              <div className="w-44 h-44 rounded-full overflow-hidden border-4">
                <Image
                  src={doctor.profileImage}
                  alt="Doctor profile image"
                  width={175}
                  height={175}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold mt-3">{doctor.doctor?.name}</h3>

              <h5 className="text-md mt-3 text-gray-700 line-clamp-2 max-w-full truncate">
                {doctor.specialization[0]}
              </h5>

              <Link
                href={`/user/doctors/doctor/${doctor.doctor?._id}`}
                className="mt-1 text-sm text-red-950 hover:underline"
              >
                View Profile
              </Link>

              <div className="mt-4 w-full">
                <Link href={`/user/doctors/booking/${doctor.doctor._id}`}>
                <button className="w-full bg-red-950 hover:bg-red-900 text-white font-semibold py-3 px-7 rounded-md shadow-lg transition-all duration-300">
                  Book Appointment
                </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorList;
