"use client"

import React from "react";
import { Button } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useRouter } from "next/navigation";

function QuickActions() {
    const Router = useRouter();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-1 flex justify-around items-center gap-1 sm:hidden z-10 border-t border-gray-200">
      <Button
        onClick={() => Router.push("/user/events")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        style={{ color: "#808080" }}
      >
        <EventIcon />
        <span className="text-xs mt-1">Events</span>
      </Button>

      <Button
        onClick={() => Router.push("/user/equipments")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        style={{ color: "#808080" }}
      >
        <MedicalServicesIcon />
        <span className="text-xs mt-1">Equipment</span>
      </Button>

      <Button
        onClick={() => Router.push("/user/doctors")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        style={{ color: "#808080" }}
      >
        <FaStethoscope size={22} />
        <span className="text-xs mt-1">Doctor</span>
      </Button>

      <Button
        onClick={() => Router.push("/user/bloodDonors")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        style={{ color: "#808080" }}
      >
        <BloodtypeIcon />
        <span className="text-xs mt-1">Blood</span>
      </Button>

      <Button
        onClick={() => Router.push("/user/volunteers")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        style={{ color: "#808080" }}
      >
        <VolunteerActivismIcon />
        <span className="text-xs mt-1">Help</span>
      </Button>
    </div>
  );
}

export default QuickActions;
