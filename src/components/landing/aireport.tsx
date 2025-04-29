"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const Aireport = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="bg-white flex flex-col md:flex-row w-full max-w-6xl mx-auto py-8 md:py-16 px-4 md:px-6 gap-8">
      <div
        className="w-full md:w-1/2 flex flex-col justify-center space-y-6 pt-6 md:pt-12"
        data-aos="flip-right"
      >
        <div className="space-y-2">
          <h3 className="text-gray-500 uppercase tracking-wider text-sm font-semibold">
            What we Give
          </h3>
          <h2 className="text-gray-700 text-2xl md:text-3xl font-bold">
            Check your Health and Seek Help to proffessionals
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed">
          We Provide a AI based Health report based on your Health Data Check
          it! and You can Consult the Expert Medical Proffessionals in our app.
        </p>

        <div>
          <h2 className="text-teal-500 font-medium hover:underline">
            all in one for health support
          </h2>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 relative h-64 md:h-96 min-h-[16rem] md:min-h-[24rem]" data-aos="flip-left">
       
        <div className="block md:hidden w-full h-full rounded-lg shadow-lg overflow-hidden">
          <Image
            src="https://i.pinimg.com/736x/88/f0/75/88f075fe3bbe5e5e282666765fd33784.jpg"
            alt="Healthcare professional with patient"
            fill
            className="object-cover"
          />
        </div>

     
        <div className="hidden md:block w-full h-full relative">
          <div className="absolute right-0 top-0 w-48 h-40 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/33/3c/a2/333ca2c8e19b327d739b2a32e0fb5994.jpg"
              alt="Parent with child"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-16 top-32 w-64 h-48 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/36/b7/27/36b727443c7e1f435b7ed8a7faa6ba29.jpg"
              alt="Healthcare professional with patient"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute left-16 top-5 w-40 h-36 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/88/f0/75/88f075fe3bbe5e5e282666765fd33784.jpg"
              alt="Family healthcare"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-0 bottom-0 w-48 h-32 shadow-lg rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/e5/3e/e4/e53ee4d52ce528f8083e72d26c8d3f7d.jpg"
              alt="Serene landscape"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute left-24 bottom-16 bg-white p-4 rounded-full shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-teal-500"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aireport;