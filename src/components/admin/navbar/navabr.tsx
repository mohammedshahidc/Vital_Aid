"use client";

import { AiOutlineLogout } from "react-icons/ai";
import axiosErrorManager from "@/utils/axiosErrormanager";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";


function Navbar() { 
 
  const router=useRouter()
  const logOut = async () => {
    try {
        await axiosInstance.delete('/auth/logout')
        localStorage.clear()
        router.push('/')
       
    } catch (error) {
        console.error("Logout failed", error)
        axiosErrorManager(error)
    }
  };
  return (
    <nav className="fixed top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 w-full shadow-md ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-xl font-bold text-gray-900 dark:text-white  ml-12 sm:ml-0">
          Vital Aid
        </div>

        <button
            onClick={() => logOut()}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
            title="logout"
          >
            <AiOutlineLogout size={20} />
          </button>
          </div>
    </nav>
  );
}

export default Navbar;
