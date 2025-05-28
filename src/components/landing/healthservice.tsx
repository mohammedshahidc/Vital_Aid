"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const HealthcareLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full md:max-w-6xl mx-auto py-8 md:py-16 px-4 md:px-6 gap-8">
      <div className="w-full md:w-1/2 relative h-64 md:h-96 min-h-[16rem] md:min-h-[24rem]" data-aos="flip-right">
       
        <div className="block md:hidden w-full h-full rounded-lg shadow-lg overflow-hidden">
          <Image
            src="https://i.pinimg.com/736x/9b/ed/c2/9bedc2998a29073013282a9bd5c144f4.jpg"
            alt="Healthcare professional with patient"
            fill
            className="object-cover"
          />
        </div>

      
        <div className="hidden md:block w-full h-full relative">
          <div className="absolute left-0 top-0 w-48 h-40 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/c7/2f/1c/c72f1c0ef77fbb69b41fcc25a8dd8c54.jpg"
              alt="Parent with child"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute left-16 top-32 w-64 h-48 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/9b/ed/c2/9bedc2998a29073013282a9bd5c144f4.jpg"
              alt="Healthcare professional with patient"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-16 top-5 w-40 h-36 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/07/0e/ba/070eba733630e01ba90dd9f10763c1cb.jpg"
              alt="Family healthcare"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute left-0 bottom-0 w-48 h-32 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/bf/e3/9a/bfe39a414f6a4c4d7fac5ee09ad3d734.jpg"
              alt="Serene landscape"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-24 bottom-16 bg-white p-4 rounded-full shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-rose-500"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full md:w-1/2 flex flex-col justify-center space-y-6 pt-6 md:pt-12"
        data-aos="flip-left"
      >
        <div className="space-y-2">
          <h3 className="text-gray-500 uppercase tracking-wider text-sm font-semibold">
            About Us
          </h3>
          <h2 className="text-gray-700 text-2xl md:text-3xl font-bold">
            The Complete Platform for Health Saving Support.
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed">
          We have combined a new kind of user experience that aims to bridge the
          gap in healthcare services, offering a quick and reliable means of
          support for those in urgent need.
        </p>

        <div>
          <a href="#" className="text-rose-500 font-medium hover:underline">
            More About Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default HealthcareLayout;