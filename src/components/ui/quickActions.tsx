"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useRouter } from "next/navigation";

function QuickActions() {
  const Router = useRouter();
  const [selectedButton, setSelectedButton] = useState("");

  const handleSelect = (path: string ) => {
    setSelectedButton(path);
    Router.push(path);
  };

  const buttonStyle = (path: string | null) => ({
    color: selectedButton === path ? "#006600" : "#808080", 
    textTransform: "none",
    fontWeight: selectedButton === path ? "bold" : "normal",
  });

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-1 flex justify-around items-center gap-1 sm:hidden z-10 border-t border-gray-200">
      <Button
        onClick={() => handleSelect("/user/events")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        sx={buttonStyle("/user/events")}
      >
        <EventIcon fontSize="small" />
        <span className="text-xs mt-1">Events</span>
      </Button>

      <Button
        onClick={() => handleSelect("/user/equipments")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        sx={buttonStyle("/user/equipments")}
      >
        <MedicalServicesIcon fontSize="small" />
        <span className="text-xs mt-1">Equipment</span>
      </Button>

      <Button
        onClick={() => handleSelect("/user/doctors")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        sx={buttonStyle("/user/doctors")}
      >
        <FaStethoscope size={19} />
        <span className="text-xs mt-1">Doctor</span>
      </Button>

      <Button
        onClick={() => handleSelect("/user/bloodDonors")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        sx={buttonStyle("/user/bloodDonors")}
      >
        <BloodtypeIcon fontSize="small" />
        <span className="text-xs mt-1">Blood</span>
      </Button>

      <Button
        onClick={() => handleSelect("/user/volunteers")}
        variant="text"
        className="flex flex-col items-center min-w-0 px-2"
        sx={buttonStyle("/user/volunteers")}
      >
        <VolunteerActivismIcon fontSize="small" />
        <span className="text-xs mt-1">Help</span>
      </Button>
    </div>
  );
}

export default QuickActions;
