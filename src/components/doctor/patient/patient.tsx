
"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { Card, CardContent } from "@mui/material";
import ReportModal from "@/components/ui/report";
import Image from "next/image"; 
import ReviewSection from "./reviewSection";

export interface DoctorType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}


interface ProfileImage {
  originalProfile: string;
  thumbnail: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  admin: boolean;
  isVerified?: boolean;
  isDeleted: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage?: ProfileImage;
}

interface UserDetails {
  _id: string;
  age: string;
  occupation: string;
  address: string;
  gender: string;
  bloodgroup: string;
  user: string;
  profileImage?: ProfileImage;
  __v: number;
}

interface MedicalHistory {
  _id: string;
  User: Omit<User, "password" | "admin" | "isVerified" | "isDeleted" | "blocked">;
  report: string;
  healthstatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserMedicalData {
  medHistory: MedicalHistory[];
  userDetails: UserDetails;
  user: User;
}

const fetchUserById = async (id: string): Promise<UserMedicalData | null> => {
  const { data } = await axiosInstance.get(`/doctors/getUserById/${id}`);
  return data?.data || null;
};
const fetchusersREview=async(id:string)=>{
    const response=await axiosInstance.get(`/doctors/getuserreview/${id}`)
    console.log('resp:',response.data?.data);
    
        return response.data?.data
}

function Patient() {
  const { id } = useParams();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MedicalHistory | null>(null);

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id as string),
    enabled: !!id,
  });

  

  const mediHistory: MedicalHistory[] = userData?.medHistory ?? [];
  const userInfo = userData?.user ?? null;
  const userDetails = userData?.userDetails ?? null;
  const { data:userReviews,refetch} = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchusersREview(userInfo?._id as string),
    enabled: !!userInfo?._id,
  });
  const handleReportClick = (reportItem: MedicalHistory) => {
    setSelectedReport(reportItem);
    setIsReportModalOpen(true);
  };

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {(error as Error).message}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">User Details</h2>

      {userInfo && userDetails ? (
        <div className="bg-gray-100 w-full p-4 rounded-lg shadow-md">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            {userDetails.profileImage?.originalProfile ? (
            <div className="flex justify-start mb-4">
              <Image
                src={userDetails.profileImage.originalProfile}
                alt="User Profile"
                width={100}
                height={100}
                className="rounded-full shadow-md"
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center">No profile image available</p>
          )}

              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
            <div>
            <p><strong>Phone:</strong> {userInfo.phone}</p>

            <p><strong>Age:</strong> {userDetails.age}</p>

              <p><strong>Gender:</strong> {userDetails.gender}</p>
              <p><strong>Blood Group:</strong> {userDetails.bloodgroup}</p>
              <p><strong>Occupation:</strong> {userDetails.occupation}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
            </div>
          </div>
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
                reportItem.report.includes("🟢") ? "bg-green-100 hover:bg-green-200" :
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
      <ReviewSection reviews={userReviews ?? []} userId={userInfo?._id||""} refetch={refetch}/>
    </div>
  );
}

export default Patient;
