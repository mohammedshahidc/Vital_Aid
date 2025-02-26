"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { People, VolunteerActivism, LocalHospital } from "@mui/icons-material"; // MUI Icons

const About = () => {
  const [counts, setCounts] = useState({ doctors: 0, users: 0, volunteers: 0 });
  const targetCounts = { doctors: 25, users: 100, volunteers: 30 };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setCounts((prev) => ({
        doctors:
          prev.doctors < targetCounts.doctors ? prev.doctors + 1 : prev.doctors,
        users: prev.users < targetCounts.users ? prev.users + 1 : prev.users,
        volunteers:
          prev.volunteers < targetCounts.volunteers
            ? prev.volunteers + 1
            : prev.volunteers,
      }));
    }, 70);

    return () => clearInterval(interval);
  }, [ targetCounts.doctors,targetCounts.users,targetCounts.volunteers]);

  return (
    <div className="bg-gray-50">
      <section
        className="relative w-full h-screen flex items-center justify-center bg-gray-800"
        data-aos="fade-in"
      >
        <div className="absolute inset-0">
          <Image
            src="/imagehero.jpg"
            alt="Vital Aid Hero"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl font-extrabold">Welcome to Vital Aid</h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Connecting people to essential healthcare services, AI-driven health
            analysis, and volunteer assistance—all for free.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto text-center grid grid-cols-3 gap-6">
          {[
            {
              title: "Doctors",
              count: counts.doctors,
              target: targetCounts.doctors,
              icon: (
                <LocalHospital fontSize="large" className="text-blue-600" />
              ),
              aos: "zoom-in",
            },
            {
              title: "Users",
              count: counts.users,
              target: targetCounts.users,
              icon: <People fontSize="large" className="text-green-600" />,
              aos: "zoom-in",
            },
            {
              title: "Volunteers",
              count: counts.volunteers,
              target: targetCounts.volunteers,
              icon: (
                <VolunteerActivism fontSize="large" className="text-red-600" />
              ),
              aos: "zoom-in",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-black p-6 rounded-lg shadow-md"
              data-aos={item.aos}
            >
              {item.icon}
              <h3 className="text-4xl font-bold text-white mt-2">
                {item.count}+
              </h3>
              <p className="text-lg text-white mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 px-6 max-w-full mx-auto">
      <div className="max-w-full mx-auto py-12 px-6">
          <h2 className="text-3xl font-medium text-gray-900 text-start mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Vital Aid is more than just a healthcare platform—it&apos;s a movement
            dedicated to bridging the gap between technology and humanitarian
            support. Through AI-driven health assessments, we empower
            individuals to check their health status and receive personalized
            medical insights. Our platform also connects users with nearby
            hospitals for appointments, facilitates access to volunteers and
            blood donors in emergencies, and allows those in need to request
            medical equipment—all at no cost. We rely on community support and
            donations to sustain our mission, ensuring that life-saving aid
            reaches those who need it most.
          </p>
        </div>
      </section>

      <section className="py-20  px-5 max-w-6xl mx-auto">
        

        <div className="grid md:grid-cols-3 gap-10 mt-6 text-center">
          {[
            {
              title: "Our Goals",
              description:
                "We aim to provide free healthcare access, AI-driven health insights, and emergency support to those in need.",
              image: "/medreport.png",
              aos: "flip-left",
            },
            {
              title: "Donation",
              description:
                "Your donations help us provide life-saving medical support, essential supplies, and emergency aid to people in crisis.",
              image: "/donate.png",
              aos: "flip-up",
            },
            {
              title: "Programs",
              description:
                "We run community health programs, volunteer-driven medical camps, and awareness campaigns to support underserved communities.",
              image: "/onlinebooking.png",
              aos: "flip-right",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
              data-aos={item.aos}
            >
              <Image src={item.image} width={80} height={80} alt={item.title} />
              <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
