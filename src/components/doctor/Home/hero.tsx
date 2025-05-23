"use client";
import { useAlltokenofeachdoctors } from "@/lib/Query/hooks/addToken";
import { useDoctorReviewforDoctors } from "@/lib/Query/hooks/doctorById";
import { Token } from "@/components/users/Token/addToken";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

import {
  FaBell,
  FaCalendar,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { FiAlertCircle, FiMessageSquare } from "react-icons/fi";
import { useRouter } from "next/navigation";


function Hero() {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(today);
  const { data: DoctorReviews } = useDoctorReviewforDoctors()
  const router=useRouter()
  useEffect(()=>{
    setDate(dayjs);
    refetch()
  },[])
  
  const { data, isLoading ,refetch} = useAlltokenofeachdoctors(
    date?.format("DD-MM-YYYY") || today.format("DD-MM-YYYY")
  );
  const tokens: Token[] = data?.data || [];


  if(isLoading){
    return <div>Loading</div>
  }
  
  const username =
    typeof window !== "undefined"
      ? localStorage.getItem("username") || "Dr. Sarah Johnson"
      : "Dr. Sarah Johnson";

  const statsCards = [
    {
      title: "Today's Appointments",
      value: tokens.length || 0,

      icon: FaCalendar,
      color: "blue",
      trend: "up",
    },
    {
      title: "Patient Reviews",
      value: DoctorReviews?.length || 0,

      icon: FaStar,
      color: "green",
      trend: "up",
    },
    {
      title: "Unread Messages",
      value: "23",

      icon: FiMessageSquare,
      color: "purple",
      trend: "urgent",
    },
    {
      title: "Total Patients",
      value: "200+",

      icon: FaUser,
      color: "orange",
      trend: "up",
    },
  ];

  



  const getStatusIcon = (status: string|undefined) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle size={16} className="text-green-600" />;
      case "pending":
        return <FaClock size={16} className="text-yellow-600" />
      default:
        return null;
    }
  };

  const getCardColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "border-t-blue-500 bg-blue-50";
      case "green":
        return "border-t-blue-500 bg-green-50";
      case "purple":
        return "border-t-blue-500 bg-purple-50";
      case "orange":
        return "border-t-blue-500 bg-orange-50";
      default:
        return "border-t-gray-500 bg-gray-50";
    }
  };

  const getIconColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-100";
      case "green":
        return "text-green-600 bg-green-100";
      case "purple":
        return "text-purple-600 bg-purple-100";
      case "orange":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white  border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {username}
              </h1>
              <p className="text-gray-600">Heres whats happening today</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold text-blue-900">
                Wednesday, May 22, 2025
              </p>
              <p className="text-xs text-blue-700">
                {today.format("hh:mm A")} Local Time
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => {
            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border-t-4 ${getCardColorClasses(
                  card.color
                )} p-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium mb-2">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${getIconColorClasses(
                      card.color
                    )}`}
                  >
                    <FaBell size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Todays Schedule
              </h2>
              <button
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
                onClick={()=>router.push("/doctor/tokens")}
              >
                <span>View All</span>
                <FaChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {tokens?.map((value, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-700">
                        {value?.patientId?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {value?.patientId?.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          immediate • dr room
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(value?.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border 
                            `}
                          >
                            {value?.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {value?.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <FiAlertCircle size={20} className="text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-1">
                    Urgent Message
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    There is New message from users
                  </p>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700" onClick={()=>router.push("/doctor/message")}>
                    Check Now
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Heyy</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg flex items-center space-x-3 transition-colors">
                  <FaUser size={18} className="text-green-600" />
                  <div className="text-green-900 font-medium">
                    Add New Patient
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center space-x-3 transition-colors">
                  <FiMessageSquare size={18} className="text-purple-600" />
                  <span className="text-purple-900 font-medium">
                    Send Message
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
