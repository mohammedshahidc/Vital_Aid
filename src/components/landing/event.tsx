"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


const Event = () => {
  const Router= useRouter()
  const images = [
  
    {
      src: "https://vitalaidnsr.s3.ap-south-1.amazonaws.com/uploads/1740141155154-u00vvjb3wkr.png",
      type: "external"
    },
    {
      src: "https://vitalaidnsr.s3.ap-south-1.amazonaws.com/uploads/1740139673049-uqaajs5o22h.png", 
      type: "external"
    },
    {
      src: "https://vitalaidnsr.s3.ap-south-1.amazonaws.com/uploads/1740138397693-9magp9x1a3k.jpeg",
      type: "external"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative">
      <div >
        <Image
          src={currentImage.src}
          alt="Image Slider"
          width={500}
          height={300}
          className="w-full h-[600px]"
          unoptimized={currentImage.type === "external"}
        />
        <div onClick={()=>Router.push("/login")}
          className="absolute bottom-4 right-4 bg-white p-4 rounded-md shadow-md hover:cursor-pointer"
        >
          <p className="text-black text-sm font-bold border-2 p-3 rounded-md border-lime-700">
            Learn More!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Event;