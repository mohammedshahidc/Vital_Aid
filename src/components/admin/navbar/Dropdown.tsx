"use client";
import axiosInstance from '@/utils/axios'
import React from 'react'
import { useRouter } from 'next/navigation'; 
import axiosErrorManager from '@/utils/axiosErrormanager';


const Dropdown = () => {
   
    const router=useRouter()
    
    const logOut = async () => {
        try {
            await axiosInstance.delete('/auth/logout')
            router.push('/')
        } catch (error) {
            console.error("Logout failed", error)
            axiosErrorManager(error)
        }
    };
  return (
    <div className="absolute right-6 top-16 bg-white shadow-lg rounded-lg w-48 p-4 z-50">
      <button onClick={logOut}  className="px-4 py-2 bg-red-500 text-white rounded w-full hover:bg-red-600">Log out</button>
    </div>
  )
}

export default Dropdown
