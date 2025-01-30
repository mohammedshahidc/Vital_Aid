
"use client"

import Image from 'next/image';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroimg from '../../../../public/heroimg.jpg';

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="mt-20 bg-white sm:h-[700px] md:h-screen w-full flex items-center justify-center shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-72 sm:gap-16">

        <div
          className="text-center md:text-left mb-14"
          data-aos="fade-right"

        >
          <div className='space-y-7'>
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent tracking-wide">
              VitalAid
            </h1>
            <h1 className="text-1xl md:text-2xl sm:text-3xl font-thin font-serif text-green-500 ">
              Your trusted partner for life-saving support
            </h1>
          </div>

        </div>

        <div data-aos="fade-left">
          <Image
            src={heroimg}
            alt="Description of the image"
            width={450}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
