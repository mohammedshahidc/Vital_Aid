"use client";

import React, { useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AddReportModal from "@/components/ui/addDetail";
import ReportModal from "@/components/ui/report";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
} from "@mui/material";
import { FaClock, FaMapPin, FaPhone, FaStethoscope } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useFetchreport, useFetchDetails } from "@/lib/Query/hooks/useReport";
import { useFetchMessages } from "@/lib/Query/hooks/useMessage";
import { useGetTokenForUser } from "@/lib/Query/hooks/addToken";

type Report = {
  _id: string;
  User: string;
  report: string;
  healthstatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type editDatas = {
  age: string;
  gender: string;
  bloodgroup: string;
  occupation: string;
  address: string;
  profileImage: string;
};
type Message = {
  _id: string;
  message: string;
};
const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const Router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { details } = useFetchDetails(user?.id ?? "");
  console.log(details);
  
  const { reports } = useFetchreport(user?.id ?? "");
  const { messages } = useFetchMessages();
  const { tokens } = useGetTokenForUser();
  

  const [editData, setEditData] = useState<editDatas>({
    age: details?.age,
    gender: details?.gender,
    bloodgroup: details?.bloodgroup,
    occupation: details?.occupation,
    address: details?.address,
    profileImage: "",
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const response = await axiosInstance.get(`/auth/generate-signed-url`, {
          params: { fileType: file.type },
        });

        const { signedUrl, fileName } = response.data;

        await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        const newImageUrl = `https://vitalaidnsr.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
        await setImageUrl(newImageUrl);
        setEditData((prev) => ({
          ...prev,
          profileImage: newImageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if(details){
        await axiosInstance.put(`/users/editdetailsofthe`,editData)
        setIsEditing(false)
      }else{
        await axiosInstance.post(`/users/addDetails/${user?.id}`, editData);
        setIsEditing(false);
      }
      
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-72 bg-white shadow-lg rounded-lg p-6 hidden sm:block">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Welcome, {user?.name}
          </h2>

          <h3 className="font-bold text-green-600 mt-4 text-center">
            Quick Actions
          </h3>
          <div className="space-y-3 mt-4">
            <Button
              onClick={() => Router.push("/user/bloodDonors")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white py-2"
            >
              <BloodtypeIcon /> Request Blood
            </Button>

            <Button
              onClick={() => Router.push("/user/equipments")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-2"
            >
              <MedicalServicesIcon /> Medical Equipment
            </Button>
            <Button
              onClick={() => Router.push("/user/events")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-2"
            >
              <EventIcon />
              our Events
            </Button>

            <Button
              onClick={() => Router.push("/user/doctors")}
              variant="contained"
              className="w-full flex items-center gap-3 hover:bg-blue-600 text-white py-2"
            >
              <FaStethoscope className="w-5 h-5" /> Consult a Doctor
            </Button>

            <Button
              onClick={() => Router.push("/user/volunteers")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-purple-500 hover:bg-blue-600 text-white py-2"
            >
              <VolunteerActivismIcon />
              our volunteers
            </Button>
            <Button
              onClick={() => Router.push("/user/equipments/request")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-2"
            >
              <MedicalServicesIcon /> My Requests
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-6 pb-16 sm:pb-0">
          <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-40 w-40 shadow-lg relative">
                <Image
                  src={
                    // Show selected image preview
                    user?.profileImage?.originalProfile ||
                    "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"
                  }
                  width={300}
                  height={300}
                  alt="Profile Image"
                  className="rounded-full"
                />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded-md shadow-md cursor-pointer"
                  />
                )}
              </Avatar>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-green-600">
                  {user?.name}
                </h2>
                <div className="space-y-1 text-gray-600 text-sm">
                  {isEditing ? (
                    <>
                      <Input
                        name="age"
                        value={editData?.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                      />
                      <Input
                        name="bloodgroup"
                        value={editData?.bloodgroup}
                        onChange={handleInputChange}
                        placeholder="Blood Group"
                      />
                      <Input
                        name="occupation"
                        value={editData?.occupation}
                        onChange={handleInputChange}
                        placeholder="Occupation"
                      />
                      <Input
                        name="address"
                        value={editData?.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                      />
                    </>
                  ) : (
                    <>
                      <p className="flex items-center gap-2">
                        <FaClock className="h-4 w-4" />{" "}
                        {details[0]?.age || "18"} | Occupation:{" "}
                        {details[0]?.occupation || "none"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FiMail className="h-4 w-4" /> {user?.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaPhone className="h-4 w-4" /> {user?.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <BloodtypeIcon className="h-4 w-4" />{" "}
                        {details[0]?.bloodgroup}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapPin className="h-4 w-4" />{" "}
                        {details[0]?.address || "none"}
                      </p>
                    </>
                  )}

                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} color="success">
                        Save
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} color="warning">
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <div className="flex justify-between m-2 overflow-y-auto scrollbar-none">
                <CardHeader
                  title={
                    <h3 className="text-lg font-semibold">Medical Report</h3>
                  }
                />
                <Button
                  variant="text"
                  color="primary"
                  className="h-7"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Add report
                </Button>
              </div>
              <CardContent className="space-y-4 max-h-32 overflow-y-auto scrollbar-none">
                {reports.length > 0 ? (
                  reports
                    .slice() 
                    .sort(
                      (a: Report, b: Report) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .map((reportItem: Report) => {
                      return (
                        reportItem.healthstatus && (
                          <div
                            key={reportItem._id}
                            className={`h-auto min-h-10 rounded p-2 shadow-sm cursor-pointer hover:shadow-md ${
                              reportItem.healthstatus === " 🟢 "
                                ? "bg-green-100 hover:bg-green-200"
                                : reportItem.healthstatus === " 🟡 "
                                ? "bg-yellow-300 hover:bg-yellow-200"
                                : reportItem.healthstatus === " 🔴 "
                                ? "bg-red-100 hover:bg-red-200"
                                : reportItem.healthstatus === " ⚠️ "
                                ? "bg-red-500 hover:bg-red-400"
                                : "bg-gray-100"
                            }`}
                            onClick={() => handleReportClick(reportItem)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="truncate">
                                {"Report of " +
                                  new Date(
                                    reportItem.createdAt
                                  ).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(
                                  reportItem.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })
                ) : (
                  <p className="text-gray-500 text-sm">No reports available</p>
                )}
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <div className="flex justify-between m-2 ">
                <CardHeader
                  title={
                    <h3 className="text-lg font-semibold">appoiment history</h3>
                  }
                />

                <Button
                  variant="text"
                  color="primary"
                  className="h-7"
                  onClick={() => Router.push("/user/doctors")}
                >
                  + Add Appointment
                </Button>
              </div>

              <CardContent className="space-y-4 max-h-32 overflow-y-auto scrollbar-none">
                {tokens.length === 0 ? (
                  <p className="text-gray-500">
                    Appointments not scheduled. Book one now!
                  </p>
                ) : (
                  tokens
                 .map(
                    (appoinment: {
                      _id: string;
                      doctorId: { name: string };
                      date: string;
                    }) => (
                      <div
                        key={appoinment._id}
                        className="h-10 p-2 bg-gray-50 rounded shadow-sm text-xs md:text-base hover:cursor-pointer hover:bg-green-50 hover:shadow-md "
                      >
                        Appointment with {appoinment?.doctorId?.name} on{" "}
                        {appoinment.date}
                      </div>
                    )
                  )
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader
              title={<h3 className="text-lg font-semibold">Notifications</h3>}
            />
            <CardContent className="space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet</p>
              ) : (
                messages.map((msgs: Message) => (
                  <div
                    key={msgs._id}
                    className="h-10 p-2 bg-gray-50  rounded shadow-sm text-xs md:text-base"
                  >
                    {msgs.message}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader
              title={
                <h3 className="text-lg font-semibold">Review from doctor</h3>
              }
            />
            <CardContent className="space-y-2">
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex justify-around items-center gap-2 sm:hidden">
        <Button
          onClick={() => Router.push("/user/events")}
          variant="contained"
          className="flex flex-col items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2"
        >
          <EventIcon />
          <span className="text-xs">events</span>
        </Button>

        <Button
          onClick={() => Router.push("/user/equipments")}
          variant="contained"
          className="flex flex-col items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2"
        >
          <MedicalServicesIcon />
          <span className="text-xs">Equipment</span>
        </Button>

        <Button
          onClick={() => Router.push("/user/doctors")}
          variant="contained"
          className="flex flex-col items-center gap-1 bg-green-500 hover:bg-green-600 text-white py-2"
        >
          <FaStethoscope className="w-5 h-5" />
          <span className="text-xs">Doctor</span>
        </Button>

        <Button
          onClick={() => Router.push("/user/bloodDonors")}
          variant="contained"
          className="flex flex-col items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-2"
        >
          <BloodtypeIcon />
          <span className="text-xs">Donors</span>
        </Button>

        <Button
          onClick={() => Router.push("/user/volunteers")}
          variant="contained"
          className="flex flex-col items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-2"
        >
          <VolunteerActivismIcon />
          <span className="text-xs">volunteers</span>
        </Button>
      </div>
      <AddReportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ReportModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={selectedReport}
      />
    </div>
  );
};

export default Home;
