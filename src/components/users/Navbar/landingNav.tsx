"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Landinav() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md">
      <div className="bg-white max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        
        <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          <Image src={"/VitalAid.png"} width={100} height={100} alt="lo"/>
        </div>

       
        <Link href="/login">
          <Button
            variant="contained"
            color="success"
            className="bg-lime-700 text-white py-2 px-4 rounded h-10"
          >
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}
