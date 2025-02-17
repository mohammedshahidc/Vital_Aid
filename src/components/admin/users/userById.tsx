"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { Card, CardContent } from "@mui/material";
import ReportModal from "@/components/ui/report";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface MedicalHistory {
  _id: string;
  User: User;
  report: string;
  createdAt: string;
  updatedAt: string;
}

type Report = {
  _id: string;
  User: User;
  report: string;
  healthstatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const fetchUserById = async (id: string) => {
  const { data } = await axiosInstance.get(`/users/getUserById/${id}`);
  return data?.data;
};

function UserById() {
  const { id } = useParams();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id as string),
    enabled: !!id,
  });

  // Ensure `mediHistory` is an array
  const mediHistory: MedicalHistory[] = Array.isArray(user) ? user : [];

  // Extract the first user if multiple reports exist
  const userInfo = mediHistory.length > 0 ? mediHistory[0].User : null;

  // Function to open the modal with the correct report data
  const handleReportClick = (reportItem: MedicalHistory) => {
    setSelectedReport({
      ...reportItem,
      healthstatus: reportItem.report, // Map report field
      __v: 0, // Dummy __v value
    });
    setIsReportModalOpen(true);
  };

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {(error as Error).message}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">User Details</h2>
      {userInfo ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No user details available</p>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mt-6">Medical Reports</h3>
      <CardContent className="space-y-3">
        {mediHistory.length > 0 ? (
          mediHistory.map((reportItem) => (
            <Card
              key={reportItem._id}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                reportItem.report.includes("🟢") ? "bg-green-100 over:bg-green-200" :
                reportItem.report.includes("🟡") ? "bg-yellow-300 hover:bg-yellow-200" :
                reportItem.report.includes("🔴") ? "bg-red-100 hover:bg-red-200" :
                reportItem.report.includes("⚠") ? "bg-red-500 hover:bg-red-400 text-white" :
                "bg-gray-100"
              }`}

              onClick={() => handleReportClick(reportItem)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  Report of {new Date(reportItem.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs text-gray-600">
                  {new Date(reportItem.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No reports available</p>
        )}
      </CardContent>

      <ReportModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={selectedReport}
      />
    </div>
  );
}

export default UserById;
