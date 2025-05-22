"use client";
import { useAlltokenofeachdoctors } from "@/lib/Query/hooks/addToken";
import { dataTagSymbol } from "@tanstack/react-query";
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
import { FiAlertCircle, FiMessageSquare, FiSettings } from "react-icons/fi";

function Hero() {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(today);
  console.log(today);
  
  useEffect(()=>{
    setDate(dayjs);
  },[])
  
  const { data, isLoading } = useAlltokenofeachdoctors(
    date?.format("DD-MM-YYYY") || today.format("DD-MM-YYYY")
  );
  console.log("daaaaaa",data);

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
      value: "14",
      subtitle: "+3 from yesterday",
      icon: FaCalendar,
      color: "blue",
      trend: "up",
    },
    {
      title: "Patient Reviews",
      value: "4.9",
      subtitle: "127 total reviews",
      icon: FaStar,
      color: "green",
      trend: "up",
    },
    {
      title: "Unread Messages",
      value: "23",
      subtitle: "5 urgent",
      icon: FiMessageSquare,
      color: "purple",
      trend: "urgent",
    },
    {
      title: "Total Patients",
      value: "2,847",
      subtitle: "+127 this month",
      icon: FaUser,
      color: "orange",
      trend: "up",
    },
  ];

  const todaysAppointments = [
    {
      time: "9:00 AM",
      patient: "John Smith",
      type: "Regular Checkup",
      status: "confirmed",
      avatar: "JS",
      duration: "30 min",
      room: "Room 204",
    },
    {
      time: "10:30 AM",
      patient: "Sarah Wilson",
      type: "Follow-up Consultation",
      status: "pending",
      avatar: "SW",
      duration: "45 min",
      room: "Room 206",
    },
    {
      time: "2:00 PM",
      patient: "Michael Brown",
      type: "Cardiac Evaluation",
      status: "urgent",
      avatar: "MB",
      duration: "60 min",
      room: "Room 202",
    },
    {
      time: "3:30 PM",
      patient: "Lisa Anderson",
      type: "Prescription Review",
      status: "confirmed",
      avatar: "LA",
      duration: "30 min",
      room: "Room 208",
    },
  ];

  const recentActivity = [
    {
      type: "review",
      message: "New patient review: 5 stars from John Smith",
      time: "3 minutes ago",
      color: "green",
    },
    {
      type: "appointment",
      message: "Appointment confirmed: Sarah Wilson",
      time: "12 minutes ago",
      color: "blue",
    },
    {
      type: "urgent",
      message: "Urgent message from Maria Garcia about chest discomfort",
      time: "45 minutes ago",
      color: "red",
    },
    {
      type: "lab",
      message: "Lab results uploaded for Patient #2847",
      time: "1 hour ago",
      color: "orange",
    },
    {
      type: "prescription",
      message: "Prescription refill request submitted",
      time: "2 hours ago",
      color: "purple",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle size={16} className="text-green-600" />;
      case "pending":
        return <FaClock size={16} className="text-yellow-600" />;
      case "urgent":
        return <FiAlertCircle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getCardColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "border-t-blue-500 bg-blue-50";
      case "green":
        return "border-t-green-500 bg-green-50";
      case "purple":
        return "border-t-purple-500 bg-purple-50";
      case "orange":
        return "border-t-orange-500 bg-orange-50";
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
      {/* Top Header */}
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
              <p className="text-xs text-blue-700">{Date.now()} Local Time</p>
            </div>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <FiSettings size={20} />
            </button>
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
                    <p
                      className={`text-sm ${
                        card.trend === "urgent"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {card.subtitle}
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
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                <span>View All</span>
                <FaChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {todaysAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-700">
                        {appointment.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {appointment.patient}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {appointment.type} • {appointment.room}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(appointment.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                              appointment.status
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {appointment.time}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {appointment.duration}
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
                    Maria Garcia Experiencing chest discomfort after new medication
                  </p>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700">
                    Reply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.color === "green"
                        ? "bg-green-500"
                        : activity.color === "blue"
                        ? "bg-blue-500"
                        : activity.color === "red"
                        ? "bg-red-500"
                        : activity.color === "orange"
                        ? "bg-orange-500"
                        : "bg-purple-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center space-x-3 transition-colors">
                  <FaCalendar size={18} className="text-blue-600" />
                  <span className="text-blue-900 font-medium">
                    Schedule Appointment
                  </span>
                </button>
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
