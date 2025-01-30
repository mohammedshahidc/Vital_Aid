"use client";

import React from "react";
import { FaUser } from "react-icons/fa";


function Navbar() {
  return (
    <nav className="fixed top-0 z-50 bg-sky-50 border-b border-gray-200 dark:bg-gray-900 w-full shadow-md ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-xl font-bold text-gray-900 dark:text-white  ml-12 sm:ml-0">
          Vital Aid
        </div>

        <div className="flex space-x-4">
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
            <FaUser size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
