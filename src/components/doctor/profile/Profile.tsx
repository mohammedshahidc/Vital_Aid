
"use client"
import React from "react";
import { Box } from "@mui/material";
import { useDoctorProfile } from "@/lib/Query/hooks/useDoctorProfile";

import MoreDetailes from "./moredetailes";
import DoctorProfile, { DoctorDetails } from "./doctorProfile";

const Profile = () => {
  const { data } = useDoctorProfile();
  const doctor: DoctorDetails = data?.data;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      {doctor && <DoctorProfile doctor={doctor} />}
      <MoreDetailes doctor={doctor} />
    </Box>
  );
};

export default Profile;
