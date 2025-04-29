"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { FaUser } from "react-icons/fa";
import {
  FaHandsHoldingChild,
  FaKitMedical,
  FaUserDoctor,
} from "react-icons/fa6";

function About() {
  AOS.init({
    duration: 1000,
  });

  return (
    <div className="bg-teal-50 h-[160px] md:h-[290px] w-full relative pt-6">
      <div
        className="flex items-center justify-center bg-white w-full h-28 md:h-60 shadow-md sm:h-36"
        data-aos="fade-up"
      >
        <div className="flex flex-row gap-8 md:flex-row md:gap-60">
          {[
            { icon: <FaUser size={25} />, value: 120, label: "Active Users" },
            {
              icon: <FaUserDoctor size={25} />,
              value: 30,
              label: "Doctor support",
            },
            {
              icon: <FaKitMedical size={25} />,
              value: 75,
              label: "equipments",
            },
            {
              icon: <FaHandsHoldingChild size={25} />,
              value: 100,
              label: "Volunteers",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-gray-700 flex items-center mb-2">{item.icon}</div>
              <CountUp
                start={0}
                end={item.value}
                duration={2}
                className="text-xl md:text-5xl font-bold text-green-800"
              />
              <span className="text-xs md:text-base font-medium text-gray-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
