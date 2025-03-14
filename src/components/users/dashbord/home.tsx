"use client";

import React from "react";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Button, Card, CardContent, Chip, Fade } from "@mui/material";
import { FaStethoscope, FaRegBell, FaClipboardList } from "react-icons/fa";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useFetchMessages } from "@/lib/Query/hooks/useMessage";
import Profilesection from "./profilesection";
import Reportsection from "./reportsection";
import Appoinmentsctn from "./appoinmentsctn";
import ReviewSection from "./reviewSection";

type Message = {
  _id: string;
  message: string;
};


const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const Router = useRouter();
  const { messages } = useFetchMessages();


  return (
    <div className="w-full mx-auto p-6 space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-72 bg-white shadow-xl rounded-xl p-6 hidden sm:block border border-gray-100">
          <div className="flex flex-col items-center pb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Welcome, {user?.name}
            </h2>
          </div>

          <h3 className="font-bold text-green-600 mt-6 mb-4 text-center">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => Router.push("/user/bloodDonors")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <BloodtypeIcon /> Request Blood
            </Button>

            <Button
              onClick={() => Router.push("/user/equipments")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <MedicalServicesIcon /> Medical Equipment
            </Button>

            <Button
              onClick={() => Router.push("/user/events")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <EventIcon />
              Our Events
            </Button>

            <Button
              onClick={() => Router.push("/user/doctors")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <FaStethoscope className="w-5 h-5" /> Consult a Doctor
            </Button>

            <Button
              onClick={() => Router.push("/user/volunteers")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <VolunteerActivismIcon />
              Our Volunteers
            </Button>

            <Button
              onClick={() => Router.push("/user/equipments/request")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <MedicalServicesIcon /> My Requests
            </Button>
            <Button
              onClick={() => Router.push("/user/donationDetails")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <ReceiptLongIcon /> My Recipts
            </Button>
            <Button
              onClick={() => Router.push("/user/doctors/allbooking")}
              variant="contained"
              className="w-full flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              style={{
                textTransform: "none",
                justifyContent: "flex-start",
                padding: "10px 16px",
              }}
            >
              <FaClipboardList size={20} /> my appointments
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-6 pb-16 sm:pb-0">
          <Profilesection />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reportsection />
            <Appoinmentsctn />
          </div>
          <Card className="shadow-lg rounded-xl overflow-hidden border-t-4  border-teal-400">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-teal-50 to-white">
              <h3 className="text-lg font-semibold text-gray-500 flex items-center">
                <FaRegBell className="mr-2 h-4 w-4" />
                Notifications
              </h3>
              <Chip
                label={`${messages.length} new`}
                size="small"
                color="primary"
                variant={messages.length > 0 ? "filled" : "outlined"}
              />
            </div>
            <CardContent className="space-y-3 p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                  <FaRegBell
                    className="text-gray-300 mb-2"
                    style={{ fontSize: 36 }}
                  />
                  <p>No new notifications</p>
                </div>
              ) : (
                messages.map((msg: Message) => (
                  <Fade in={true} key={msg._id}>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-teal-400 text-sm md:text-base">
                      {msg.message}
                    </div>
                  </Fade>
                ))
              )}
            </CardContent>
          </Card>

          <ReviewSection/>
        </div>
      </div>
    </div>
  );
};

export default Home;
