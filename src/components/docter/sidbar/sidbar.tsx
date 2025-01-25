"use client";
import React, { useState } from "react";
import { FaEnvelope, FaCalendarCheck, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="sm:hidden absolute h-10 top-2 left-4 z-50 bg-transparent text-gray-500 p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed sm:static inset-y-0 left-0 bg-sky-50 border-r border-gray-200 dark:bg-gray-900 shadow-md transform transition-transform duration-300 z-40 w-64 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <nav className="flex-1 px-4">
          <ul className="space-y-4">
            <li className="flex items-center mt-16 space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <FaEnvelope size={20} />
              <span className="text-lg">Messages</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <FaCalendarCheck size={20} />
              <span className="text-lg">Appointments</span>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition">
              <span className="text-lg">Reviews</span>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; 2025 Vital Aid. All rights reserved.
          </p>
        </div>
      </div>

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
