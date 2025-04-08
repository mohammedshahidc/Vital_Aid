"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cancellToken, useAlltokenforuser } from "@/lib/Query/hooks/addToken";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Card, CardContent } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { TokenType } from "@/lib/Query/hooks/addToken";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import Spinner from "@/components/ui/spinner";

const AllToken = () => {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(today);
  const { data, isError, isLoading, refetch } = useAlltokenforuser(
    date?.format("DD-MM-YYYY") || today.format("DD-MM-YYYY")
  );

  useEffect(() => {
    refetch();
  }, [date,refetch]);

  const allToken: TokenType[] = data?.data || [];

  return (
    <div className="flex justify-center min-h-fit  ">
      <div className="max-w-7xl p-4 mt-6 rounded-xl shadow-lg bg-white w-full">
        <Card className="shadow-lg rounded-xl overflow-hidden border-t-4 border-blue-400">
          <div className="flex justify-between px-6 py-4 bg-gradient-to-r from--50 to-white">
            <h3 className="text-lg font-semibold text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2 h-4 w-4" />
              My Appointments
            </h3>
            <MdRefresh size={29} className="text-blue-500 cursor-pointer" onClick={() => refetch()} />
          </div>
          
          <CardContent className="p-4 pb-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex justify-end mb-4">
                <DatePicker
                  label="Select Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  slotProps={{
                    textField: {
                      sx: { width: "180px" },
                    },
                  }}
                />
              </div>
            </LocalizationProvider>

            <div className="space-y-3">
              {isLoading ? (
                <Spinner/>
              ) : isError ? (
                <div className="p-3 bg-red-50 text-red-500 rounded-lg text-center">
                  Failed to load appointments.
                </div>
              ) : allToken.length > 0 ? (
                allToken.map((appointment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-sm border border-blue-100 transition-all hover:shadow-md hover:scale-[1.01]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {appointment.doctorId?.drDetails?.profileImage ? (
                          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                            <Image
                              src={appointment.doctorId.drDetails.profileImage}
                              alt="Doctor Profile"
                              width={56}
                              height={56}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                            <FaUserMd size={24} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            Dr. {appointment.doctorId?.name || "N/A"}
                          </h4>
                          <span 
                            className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                              appointment.status === "Completed" 
                                ? "bg-green-100 text-green-700" 
                                : appointment.status === "cancelled" 
                                ? "bg-red-100 text-red-700" 
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appointment.status || "N/A"}
                          </span>
                        </div>
                        
                        <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Token:</span> {appointment.tokenNumber || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {appointment.doctorId?.drDetails?.availability || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> {appointment.doctorId?.phone || "N/A"}
                          </div>
                        </div>
                      </div>
                      
                      {appointment.status !== "cancelled" && appointment.status !== "Completed" && (
                        <button
                          onClick={() => cancellToken(appointment._id, "cancelled", refetch)}
                          className="ml-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm border border-gray-100 h-14 flex items-center justify-center text-gray-400">
                  No appointments found for this date.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllToken;