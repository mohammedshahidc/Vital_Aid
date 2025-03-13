"use client";

import React, { useEffect } from "react";
import { useDoctorUser } from "@/lib/Query/hooks/useDocterUser";
import Link from "next/link";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import Spinner from "@/components/ui/spinner";

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
  const { doctors ,isLoading} = useDoctorUser();
  console.log(doctors, "Fetched Doctors");


  const doctorList: Doctor[] = Array.isArray(doctors?.data?.data)
    ? doctors.data?.data
    : [];

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      Aos.init({ duration: 1000, once: true });
    }
  }, []);

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className="max-w-full mx-auto md:mx-11 p-6">
      <h2 className="text-3xl font-medium text-center mb-8 text-red-950">
        Meet Our Doctors
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        data-aos="fade-up"
      >
        {doctorList.length > 0 ? (
          doctorList.map((doctor) => (
            <div
              key={doctor._id}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-lg hover:cursor-pointer"
              data-aos="fade-up"
            >
              <div className="w-44 h-44 rounded-full overflow-hidden border-4">
                <Image
                  src={doctor.profileImage}
                  alt={`${doctor.doctor?.name} profile`}
                  width={175}
                  height={175}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold mt-3">
                {doctor.doctor?.name}
              </h3>

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
