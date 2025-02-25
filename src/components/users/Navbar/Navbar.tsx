"use client";

import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Fade } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { MdMedicalServices, MdVolunteerActivism, MdEvent, MdBloodtype, MdMedicalInformation } from 'react-icons/md';
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const logOut = async () => {
    try {
        await axiosInstance.delete('/auth/logout')
        router.push('/')
    } catch (error) {
        console.error("Logout failed", error)
        axiosErrorManager(error)
    }
};

  const menuItems = [
    { text: 'Doctors', href: '/user/doctors', icon: <MdMedicalServices className="text-teal-600" /> },
    { text: 'Volunteers', href: '/user/volunteers', icon: <MdVolunteerActivism className="text-teal-600" /> },
    { text: 'Events', href: '/user/events', icon: <MdEvent className="text-teal-600" /> },
    { text: 'Blood Donors', href: '/user/bloodDonors', icon: <MdBloodtype className="text-teal-600" /> },
    { text: 'Equipments', href: '/user/equipments', icon: <MdMedicalInformation className="text-teal-600" /> },
  ];

  return (
    <nav className="fixed top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 w-full shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          href="/user"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Vital Aid
        </Link>

        <div className="lg:hidden flex gap-2">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => {
              router.push("/user/donationHome");
              setMenuOpen(false);
            }}
          >
            Donate
          </Button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          <Link
            href="/user"
            className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Home
          </Link>

          <div>
            <button
              onClick={handleMenuOpen}
              className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900"
            >
              Services
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              elevation={3}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                className: "mt-2 py-2 rounded-lg shadow-lg"
              }}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.text}
                  onClick={handleMenuClose}
                  className="hover:bg-gray-50 px-6 py-3"
                >
                  <Link href={item.href} className="flex items-center gap-3 min-w-[200px]">
                    <ListItemIcon className="min-w-0">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      className="text-gray-700 font-medium"
                    />
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Link
            href="/user/about-us"
            className="block text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition py-2 lg:py-0"
          >
            About Us
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center space-x-4">
          <Button
            variant="contained"
            color="success"
            onClick={() => router.push("/user/donationHome")}
          >
            Donate now
          </Button>
          <button
            onClick={() => router.push("/user/message")}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
            title="chat with doctors"
          >
            <IoChatbubblesOutline size={20} />
          </button>
          <button
            onClick={() => logOut()}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
            title="logout"
          >
            <AiOutlineLogout size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 py-4 px-6 absolute top-full right-0 w-64 shadow-lg rounded-bl-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/user"
              className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            
            

            <Link
              href="/about-us"
              className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/user/message"
              className="flex items-center gap-2 text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              <IoChatbubblesOutline size={20} />
              <span>Chat with doctors</span>
            </Link>

            <Link
              href="/user/doctors/allbooking"
              className="text-gray-700 font-serif font-semibold dark:text-gray-300 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              My Appointments
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}