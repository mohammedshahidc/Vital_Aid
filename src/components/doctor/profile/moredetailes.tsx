"use client";

import React, { useState } from "react";
import { Card, Typography, Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DoctorDetails } from "./doctorProfile";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";

export interface Appointment {
  _id: string;
  doctor: string;
  startingTime: string;
  endingTime: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  __v: number;
}
interface MoreDetailsProps {
  doctor: DoctorDetails;
}

const MoreDetailes: React.FC<MoreDetailsProps> = () => {
  const [selectedStartingTime, setSelectedStartingTime] =
    useState<Dayjs | null>(null);
  const [selectedEndingTime, setSelectedEndingTimt] = useState<Dayjs | null>(
    null
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const slotData = {
      startingTme: selectedStartingTime?.format("hh:mm A"),
      endingTime: selectedEndingTime?.format("hh:mm A"),
    };

    try {
      await axiosInstance.put("/doctors/updateavailability", slotData);
      toast.success("available time edited successfully");
    } catch (error) {
      axiosErrorManager(error);
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card
        sx={{
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          mt: 4,
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mt: 4, mb: 3, fontWeight: "bold", color: "green" }}
        >
          Edit Availability
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TimePicker
                label="Select starting Time"
                value={selectedStartingTime}
                onChange={(newValue) => setSelectedStartingTime(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TimePicker
                label="Select ending Time"
                value={selectedEndingTime}
                onChange={(newValue) => setSelectedEndingTimt(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </LocalizationProvider>
    </div>
  );
};

export default MoreDetailes;
