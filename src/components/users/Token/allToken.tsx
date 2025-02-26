"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cancellToken, useAlltokenforuser } from "@/lib/Query/hooks/addToken";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Typography,
  CardContent,
  Card,
  CircularProgress,
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { TokenType } from "@/lib/Query/hooks/addToken";

const AllToken = () => {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(today);
  const { data, isError, isLoading, refetch } = useAlltokenforuser(
    date?.format("DD-MM-YYYY") || today.format("DD-MM-YYYY")
  );

  useEffect(() => {
    refetch();
  }, [date]);

  const allToken: TokenType[] = data?.data || [];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          p: 2,
          borderRadius: 2,
          mt: 3,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          fontWeight="bold"
          mb={2}
          textAlign="center"
        >
          My Appointments
        </Typography>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              slotProps={{
                textField: {
                  sx: { width: "50%" },
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", height: 100 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : isError ? (
          <Typography color="error" textAlign="center">
            Failed to load appointments.
          </Typography>
        ) : allToken.length > 0 ? (
          allToken.map((appointment, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                backgroundColor: "#E3F2FD",
                borderRadius: 2,
                transition: "0.3s",
                p: 2,
                display: "flex",
                alignItems: "center",
                minHeight: 100,
                position: "relative",
                "&:hover": {
                  backgroundColor: "#BBDEFB",
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              {/* Profile Image */}
              {appointment.doctorId?.drDetails?.profileImage && (
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    overflow: "hidden",
                    mr: 2,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={appointment.doctorId.drDetails.profileImage}
                    alt="Doctor Profile"
                    width={60}
                    height={60}
                  />
                </Box>
              )}

              {/* Appointment Details */}
              <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
                {/* Cancel Button (only if not cancelled) */}
                {appointment.status !== "cancelled" && (
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() => {
                      if (appointment.status !== "Completed") {
                        cancellToken(appointment._id, "cancelled", refetch);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                )}

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body1">
                    <strong>Doctor Name:</strong> {appointment.doctorId?.name || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Token Number:</strong> {appointment.tokenNumber || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Time:</strong>{" "}
                    {appointment.doctorId?.drDetails?.availability || "N/A"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        appointment.status === "Completed"
                          ? "green"
                          : appointment.status === "cancelled"
                          ? "red"
                          : appointment.status === "pending"
                          ? "orange"
                          : "inherit",
                    }}
                  >
                    <strong>Status:</strong> {appointment.status || "N/A"}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    <strong>Phone:</strong> {appointment.doctorId?.phone || "N/A"}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))
        ) : (
          <Typography textAlign="center">No appointments found for this date.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllToken;
