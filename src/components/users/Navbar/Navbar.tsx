"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaBell } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-sky-50 border-b border-gray-200 dark:bg-gray-900 w-full shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
       
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Vital Aid
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <div
          className={`hidden lg:flex lg:items-center lg:space-x-8`}
        >
          <Link
            href="/home"
            className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2 lg:py-0"
          >
            Home
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2 lg:py-0"
            >
              Services
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-10 w-40">
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/doctors"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Doctors
                </Link>
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/volunteers"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Volunteers
                </Link>
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/events"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Events
                </Link>
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/blooddonors"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Blood Donors
                </Link>
              </div>
            )}
          </div>
          <Link
            href="#about-us"
            className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2 lg:py-0"
          >
            About Us
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center space-x-4">
          <Button className="bg-lime-700 text-white py-2 px-4 rounded h-10 lg:w-auto">
            Donate now
          </Button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition w-full lg:w-auto">
            <FaBell size={20} />
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition w-full lg:w-auto">
            <FaUser size={20} />
          </button>
        </div>
      </div>

    
      {menuOpen && (
        <div className="lg:hidden bg-sky-50 dark:bg-gray-900 py-4 px-6 space-y-4 float-right ">
          <Link
            href="/home"
            className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Services
            </button>
            {dropdownOpen && (
              <div className="mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 space-y-2 z-10">
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/doctors"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Doctors
                </Link>
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/volunteers"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Volunteers
                </Link>
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/events"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Events
                </Link>
                <Link onClick={() => setDropdownOpen(!dropdownOpen)}
                  href="/blooddonors"
                  className="block px-4 py-2 font-serif font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Blood Donors
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/about-us"
            className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Button variant="contained" className="bg-lime-700 text-white py-2 px-4 rounded ">
            Donate now
          </Button>
          <div className="flex space-x-4">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              <FaBell size={20} />
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              <FaUser size={20} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
