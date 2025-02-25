"use client";
import React, { useState } from "react";
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

export interface MedicalHistory {
  _id: string;
  User: User;
  report: string;
  createdAt: string;
  updatedAt: string;
  healthstatus?: string;
}

export interface UserDetails {
  _id: string;
  user: string;
  age: string;
  occupation: string;
  address: string;
  __v: number;
}

export interface UserResponse {
  medHistory: MedicalHistory[];
  userDetails: UserDetails;
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

const fetchUserById = async (id: string): Promise<UserResponse> => {
  const { data } = await axiosInstance.get(`/users/getUserById/${id}`);
  return data?.data;
};

function UserById() {
  const { id } = useParams();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<UserResponse>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id as string),
    enabled: !!id,
  });

  const medHistory: MedicalHistory[] = user?.medHistory || [];
  const userDetails: UserDetails | null = user?.userDetails || null;

  const handleReportClick = (reportItem: MedicalHistory) => {
    setSelectedReport({
      ...reportItem,
      healthstatus: reportItem.healthstatus || reportItem.report,
      __v: 0,
    });
    setIsReportModalOpen(true);
  };

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">User Details</h2>
      {userDetails ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between">
          <div>
            <p>
              <strong>Name:</strong> {medHistory[0]?.User.name}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {medHistory[0]?.User.email || "Not available"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {medHistory[0]?.User.phone || "Not available"}
            </p>
          </div>
          <div>
            <p>
              <strong>Address:</strong> {userDetails.address}
            </p>
            <p>
              <strong>Age:</strong> {userDetails.age}
            </p>
            <p>
              <strong>Occupation:</strong> {userDetails.occupation}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No user details available</p>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mt-6">
        Medical Reports
      </h3>
      <CardContent className="space-y-3">
        {medHistory.length > 0 ? (
          medHistory.map((reportItem) => (
            <Card
              key={reportItem._id}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                reportItem.report.includes("🟢")
                  ? "bg-green-100 hover:bg-green-200"
                  : reportItem.report.includes("🟡")
                  ? "bg-yellow-300 hover:bg-yellow-200"
                  : reportItem.report.includes("🔴")
                  ? "bg-red-100 hover:bg-red-200"
                  : reportItem.report.includes("⚠")
                  ? "bg-red-500 hover:bg-red-400 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handleReportClick(reportItem)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  Report of{" "}
                  {new Date(reportItem.createdAt).toLocaleDateString()}
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
