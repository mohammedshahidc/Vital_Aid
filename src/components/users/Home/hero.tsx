import Image from 'next/image';
import React from 'react';
import heroimg from "../../../../public/heroimg.jpg"

function Hero() {
  return (
    <div className="bg-white sm: h-[700px] md:h-screen w-full flex items-center justify-center shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-72 sm: gap-16   ">
        
        <div className="text-center md:text-left">
          <h1 className="text-1xl md:text-3xl sm: text-3xl font-thin font-serif text-green-500">
            Your trusted partner for <br/>life-saving support<br/>when it maters most
          </h1>
        </div>
        <div>
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
