"use client"
import React, { useState,useEffect } from 'react'
import type { Request } from '@/lib/store/features/requestSlice'
import { useRequest } from '@/lib/Query/hooks/useRequest'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Button, CircularProgress } from '@mui/material'
import Image from 'next/image';
import axiosInstance from '@/utils/axios';
import axiosErrorManager from '@/utils/axiosErrormanager';



const Request = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const { data, isLoading, error,refetch } = useRequest(currentPage);
 useEffect(() => {
    if (data?.data) {
      setAllRequests((prevRequests) => {
        const existingIds = new Set(prevRequests.map((req) => req._id));
        const newRequests = data.data.filter((req: Request) => !existingIds.has(req._id));
        return [...prevRequests, ...newRequests]; 
      });
    }
  }, [data, currentPage]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading requests.
      </div>
    );
  }


  const totalPages = data?.totalPages || 1;

  const cancellrequest = async (id: string) => {
    try {
      await axiosInstance.put(`/users/cancellrequest/${id}`, { status: "cancelled" });
  
     
      setAllRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: "cancelled" } : req
        )
      )
      refetch()
    } catch (error) {
      axiosErrorManager(error);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-fit py-6 bg-gray-100">
    <div className="w-full sm:w-9/12 md:w-9/12 bg-gradient-to-t from-slate-200 to-white shadow-xl py-4 rounded-xl px-4">
      {/* Requests Container with Scrollable Feature */}
      <div className="max-h-[500px] overflow-y-scroll px-2 w-full scrollbar-none">
        {allRequests.length > 0 ? (
          allRequests.map((req: Request) =>
            req?.equipment ? (
              <div
                key={req._id}
                className="flex flex-row w-full bg-white shadow-md rounded-lg mb-4 p-4 items-center"
              >
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={req.equipment.image}
                    alt={req.equipment.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold">{req?.user?.name}</p>
                  <p className="text-gray-500">Location: {req?.location}</p>
                  <p
                    className={`text-sm font-bold ${
                      req.status === "pending" ? "text-yellow-600" : "text-green-600"
                    }`}
                  >
                    Status: {req.status}
                  </p>
                </div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => cancellrequest(req._id)}
                  disabled={req?.status === "cancelled"}
                >
                  {req?.status === "cancelled" ? "Cancelled" : "Cancel"}
                </Button>
              </div>
            ) : null
          )
        ) : (
          <p className="text-center text-gray-500 py-4">No requests found.</p>
        )}
      </div>
    </div>
  
    {/* Pagination Buttons */}
    <div className="flex justify-center mt-6 space-x-4">
      <Button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
          } else {
            setAllRequests([]);
            setCurrentPage(1);
          }
        }}
        disabled={currentPage === 1}
        variant="contained"
        color="primary"
        className="bg-green-700 hover:bg-green-900"
      >
        Previous
      </Button>
  
      <span className="text-lg font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
  
      <Button
        onClick={() => {
          if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
          }
        }}
        disabled={currentPage === totalPages}
        variant="contained"
        color="primary"
        className="bg-green-700 hover:bg-green-900"
      >
        Next <IoIosArrowDropdownCircle size={20} />
      </Button>
    </div>
  </div>
  
  );
}

export default Request;
