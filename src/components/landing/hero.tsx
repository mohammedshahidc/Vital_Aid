"use client";

import Image from "next/image";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

function Hero() {
  AOS.init({
    duration: 1000,
  });
  const Router= useRouter()

  return (
    <div className=" mx-auto md:mx-16">
      <div className="bg-gray-50 w-full flex items-center justify-center p-8 rounded-3xl mt-32 py-20 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full ">
          <div
            className="text-left mb-8 md:mb-0  md:w-1/2 pr-4"
            data-aos="fade-right"
          >
            <div className="space-y-4 ">
              <h1 className="text-5xl md:text-6xl font-bold text-teal-800 border-black tracking-tight leading-tight ">
                VitalAid
              </h1>
              <h1 className="text-2xl md:text-6xl font-semibold text-black tracking-tight leading-tight">
                Your trusted
                <br />
                Health Partner
                
                
              </h1>
              <p className="text-gray-500 text-sm md:text-base mt-4">
                all in one for health support
              </p>
              <button className="mt-6 flex items-center bg-white text-black px-4 py-2 rounded-full shadow-sm hover:shadow-md transition" onClick={()=>Router.push("/login")}>
                Get started now
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 8L14 12L10 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className=" w-full md:w-1/2 " data-aos="fade-left">
            <div className="relative">
              <div className="relative h-64 md:h-80 w-full">
                <svg
                  className="absolute top-4 left-20 w-6 h-6 text-yellow-400"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"
                  />
                </svg>
                <svg
                  className="absolute top-10 right-20 w-6 h-6 text-blue-400"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div data-aos="fade-left">
                    <Image
                      src="/heroimg-removebg-preview.png"
                      alt="Description of the image"
                      width={450}
                      height={400}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2">
                  <div className="w-8 h-16 bg-lime-300 rounded-t-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
