"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
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

type UserDetails = {
  age: string;
  gender: string;
  bloodgroup: string;
  occupation: string;
  address: string;
};

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
};

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [udetails, setUdetails] = useState<UserDetails | null>(null);
  const [report, setReport] = useState<Report[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  type Message = {
    _id: string;
    message: string;
  };

  const [msg, setMessage] = useState<Message[]>([]);
  console.log(msg);
  const Router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<editDatas>({
    age: "",
    gender: "",
    bloodgroup: "",
    occupation: "",
    address: "",
  });

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const details = await axiosInstance.get(
          `/users/getdetails/${user?.id}`
        );
        setUdetails(details.data[0]);
        setEditData(details.data[0]);
      } catch (error) {
        axiosErrorManager(error);
      }
    };
    fetchdetails();
  }, [user]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/getreportof/${user?.id}`
        );
        const reportData = response.data || [];
        console.log(reportData);
        setReport(reportData);
      } catch (error) {
        axiosErrorManager(error);
      }
    };
    fetchReports();
  }, [user]);

  useEffect(() => {
    const fetchmsg = async () => {
      try {
        const response = await axiosInstance.get("/users/getusermsg");
        console.log("object", typeof response.data.data);
        setMessage(response.data.data);
      } catch (error) {
        axiosErrorManager(error);
      }
    };
    fetchmsg();
  }, []);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post(`/users/addDetails/${user?.id}`, editData);

      setIsEditing(false);
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
              <Avatar className="h-40 w-40 shadow-lg">
                <Image
                  src={
                    user?.profileImage?.originalProfile ||
                    "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"
                  }
                  width={300}
                  height={300}
                  alt="Profile Image"
                  className="rounded-full"
                />
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
                        <FaClock className="h-4 w-4" /> {udetails?.age || "18"}{" "}
                        | Occupation: {udetails?.occupation || "none"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FiMail className="h-4 w-4" /> {user?.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaPhone className="h-4 w-4" /> {user?.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapPin className="h-4 w-4" />{" "}
                        {udetails?.address || "none"}
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
                  onClick={() => setIsModalOpen(true)}
                >
                  + Add report
                </Button>
              </div>
              <CardContent className="space-y-2">
                {report.length > 0 ? (
                  report.map((reportItem) => {
                    return (
                      reportItem.healthstatus && (
                        <div
                          key={reportItem._id}
                          className={`h-auto min-h-10 rounded p-2 shadow-sm cursor-pointer ${
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
                  onClick={() => Router.push("/user/doctors")}
                >
                  + Add Appointment
                </Button>
              </div>

              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  View with doctor
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  View with doctor
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader
              title={<h3 className="text-lg font-semibold">Notifications</h3>}
            />
            <CardContent className="space-y-2">
              {msg.length === 0 ? (
                <p className="text-gray-500">No messages yet</p>
              ) : (
                msg.map((msgs) => (
                  <div
                    key={msgs._id}
                    className="h-10 p-2 bg-gray-50 rounded shadow-sm"
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
