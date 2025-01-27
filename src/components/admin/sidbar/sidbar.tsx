"use client";
import React, { useState } from "react";
import { FaEnvelope, FaCalendarCheck, FaUserMd, FaUsers, FaRegCalendarAlt, FaHandHoldingHeart, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="sm:hidden absolute h-10 top-2 left-4 z-50 bg-transparent text-gray-500 p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:static inset-y-0 left-0 bg-sky-50 border-r border-gray-200 dark:bg-gray-900 shadow-md transform transition-transform duration-300 z-40 w-64 flex flex-col h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6">
          <ul className="grid grid-cols-1 gap-4">
            {/* User Doctor Section */}
            <li className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaUserMd size={24} className="text-sky-500" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">User Doctor</span>
            </li>

            {/* Appointments Section */}
            <li className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaCalendarCheck size={24} className="text-sky-500" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Appointments</span>
            </li>

            {/* Events Section */}
            <li className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaRegCalendarAlt size={24} className="text-sky-500" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Events</span>
            </li>

            {/* Blood Donors Section */}
            <li className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaHandHoldingHeart size={24} className="text-sky-500" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Blood Donors</span>
            </li>

            {/* Volunteers Section */}
            <li className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FaUsers size={24} className="text-sky-500" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Volunteers</span>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; 2025 Vital Aid. All rights reserved.
          </p>
        </div>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
