
"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";



export default function Landinav() {



  return (
    <nav className="fixed top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 w-full shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        <div className="text-xl font-bold text-gray-900 dark:text-white mx-16">
          Vital Aid
        </div>

        <Link href={"/login"} className="lg:flex lg:items-center space-x-4 mx-16">
          <Button variant="contained" color="success" className="bg-lime-700 text-white py-2 px-4 rounded h-10 lg:w-auto">
            Login
          </Button>

        </Link>
      </div>

    </nav>
  );
}
