"use client"

import Image from "next/image";
import React, { useEffect } from "react";
import Doctorimg from "../../../../public/Doctor.jpg"
import donorimg from "../../../../public/donor.jpg"
import equipment from "../../../../public/equipment2.jpeg"
import volunteer from "../../../../public/volunteer.jpg"
import Link from "next/link";
import Aos from "aos";

function Specialities() {
  
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);


  return (
    <div className="bg-white p-6">
      <h2 className="text-center text-3xl font-bold text-lime-700 mb-8">
        Our Specialities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-14 cursor-pointer">
        
        <div
          className="bg-teal-50  rounded-br-3xl rounded-tl-3xl  shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-right"
        >
          <Link href={"/login"}>
            <Image
              src={Doctorimg}
              alt={"Meet Our Doctors"}

              className="rounded-tl-3xl w-full h-72 object-cover"
            />

            <div className="p-4" >
              <h3 className="text-lg font-semibold text-center text-lime-700" >
                Meet Our Doctors
              </h3>
            </div>
          </Link>
        </div>

        <div
          className="bg-teal-50  rounded-br-3xl rounded-tl-3xl shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-right"
        >
          <Link href={"/login"}>
            <Image
              src={donorimg}
              alt={"Meet Our Donors"}

              className="rounded-tl-3xl w-full h-72 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-lime-700">
                Meet Our Donors
              </h3>
            </div>
          </Link>

        </div>

        <div
          className="bg-teal-50  rounded-br-3xl rounded-tl-3xl shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-left"
        >
          <Link href={"/login"}>
            <Image
              src={equipment}
              alt={"Request for Equipments"}
              className="rounded-tl-3xl w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-lime-700">
                Request for Equipments
              </h3>
            </div>
          </Link>


        </div>
        <div
          className="bg-teal-50 rounded-br-3xl rounded-tl-3xl shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-left"
        >
          <Link href={"/login"}>
            <Image
              src={volunteer}
              alt={"Our Volunteers"}
              className="rounded-tl-3xl w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-lime-700">
                Our Volunteers
              </h3>
            </div>
          </Link>

        </div>
        
      </div>
    </div>


  );
}

export default Specialities;
