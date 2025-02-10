"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Card, CardContent, CardHeader } from "@mui/material";
import {
  FaClock,
  FaMapPin,
  FaPhone,
  FaStethoscope,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AddReportModal from "@/components/ui/addDetail";
import ReportModal from "@/components/ui/report";
import { useRouter } from "next/navigation";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";


type UserDetails = {
  age: number;
  gender: string;
  bloodgroup: string;
  occupation: string;
  address: string;
};

type Report = {
  _id: string;
  User: string;
  report: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [udetails, setUdetails] = useState<UserDetails | null>(null);
  const [report, setReport] = useState<Report[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const details = await axiosInstance.get(
          `/users/getdetails/${user?.id}`
        );
        setUdetails(details.data[0]);
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
  }, [user, report]);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  return (
    <div className="w-full mx-auto p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-72 bg-white shadow-lg rounded-lg p-6 hidden sm:block">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Welcome, {user?.name}
          </h2>
          <h3 className="font-bold text-green-600 mt-4 text-center">Quick Actions</h3>
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
              <VolunteerActivismIcon />our volunteers
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
                  <p className="flex items-center gap-2">
                    <FaClock className="h-4 w-4" /> {udetails?.age || "18"} |
                    Occupation:{udetails?.occupation || "none"}
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
                  <Button variant="text" color="warning">
                    edit
                  </Button>
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
                  report.map((reportItem) => (
                    <div
                      key={reportItem._id}
                      className="h-auto min-h-10 bg-green-100 rounded p-2 shadow-sm cursor-pointer hover:bg-green-200"
                      onClick={() => handleReportClick(reportItem)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="truncate">
                          {"Report of " +
                            new Date(reportItem.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(reportItem.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
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
                <Button variant="text" color="primary">
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
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
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
