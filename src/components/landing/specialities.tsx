"use client";

import React from "react";
import Aos from "aos";
import {
  FaUserDoctor,
  FaHeartPulse,
  FaKitMedical,
  FaHandsHoldingChild,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";


function Specialities() {
  Aos.init({
    duration: 1000,
  });
  const Router = useRouter();

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-orange-500 mb-2 font-medium">
          ••• Core Features •••
        </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Amazing Healthcare Features
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Providing comprehensive healthcare solutions with a focus on
          accessibility and quality service.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          className="text-center bg-white shadow-md p-6 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
          data-aos="fade-up"
          onClick={() => Router.push("/login")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <FaUserDoctor size={40} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Meet The Doctors
          </h3>
          <p className="text-gray-500 text-sm">
            Providing health care support from experts in their field
          </p>
        </div>

        <div
          className="text-center bg-white shadow-md p-6 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="100"
          onClick={() => Router.push("/login")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <FaHeartPulse size={40} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Meet The Donors
          </h3>
          <p className="text-gray-500 text-sm">
            Connect with blood donors when you need them most
          </p>
        </div>

        <div
          className="text-center bg-white shadow-md p-6 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="200"
          onClick={() => Router.push("/login")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <FaKitMedical size={40} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Medical Equipment
          </h3>
          <p className="text-gray-500 text-sm">
            Request essential equipment when you need it most
          </p>
        </div>

        <div
          className="text-center bg-white shadow-md p-6 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="300"
          onClick={() => Router.push("/login")}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <FaHandsHoldingChild size={40} />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Our Volunteers
          </h3>
          <p className="text-gray-500 text-sm">
            Dedicated helpers ready to assist in your time of need
          </p>
        </div>
      </div>
    </div>
  );
}

export default Specialities;
