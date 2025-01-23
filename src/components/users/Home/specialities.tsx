import Image from "next/image";
import React from "react";
import Doctorimg from "../../../../public/Doctor.jpg"
import donorimg from "../../../../public/donor.jpg"
import equipment from "../../../../public/equipment2.jpeg"
import volunteer from "../../../../public/volunteer.jpg"
import Link from "next/link";


function Specialities() {
  const datas = [
    {
      images: Doctorimg,
      title: "Meet Our Doctors",
      path: "/Doctors"
    },
    {
      images: donorimg,
      title: "Meet Our Donors",
      path: "/blooddonors"
    },
    {
      images: equipment,
      title: "Request for Equipments",
      path: "/Equipment"
    },
    {
      images: volunteer,
      title: "Our Volunteers",
      path: "/Volunteer"
    },
  ];

  return (
    <div className="bg-white p-6">
      <h2 className="text-center text-3xl font-bold text-lime-500 mb-8">
        Our Specialities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-14 cursor-pointer">
        {datas.map((data, index) => (

          <div
            key={index}
            className="bg-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={data.path}>
              <Image
                src={data.images}
                alt={data.title}

                className="rounded-t-lg w-full h-72 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-center text-lime-500">
                  {data.title}
                </h3>
              </div>
            </Link>


          </div>


        ))}
      </div>
    </div>
  );
}

export default Specialities;
