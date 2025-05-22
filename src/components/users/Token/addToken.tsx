"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useDoctobyId } from "@/lib/Query/hooks/useDocterUser";
import { useParams } from "next/navigation";
import { useDoctorSlots } from "../../../lib/Query/hooks/useDoctorProfile";
import { addToken, useAlltoken } from "@/lib/Query/hooks/addToken";
import { socket } from "@/lib/socket/socketinstanc";
import OTPVerification from "./otpverification";

interface DoctorInfo {
  email: string;
  name: string;
  phone: string;
  _id: string;
}

interface DoctorData {
  description: string;
  doctor: DoctorInfo;
  profileImage: string;
  qualification: string[];
  specialization: string[];
  hospital: string;
  address: string;
}

interface Patient {
  _id?: string;
  email: string;
  name: string;
  phone: string;
  profileImage: { originalProfile: string; thumbnail: string };
}

export interface Token {
  _id: string;
  patientId: Patient;
  doctorId: string;
  date: string;
  status?: "pending" | "cancelled" | "Completed";
  tokenNumber: number;
}

const AddToken = () => {
  const { id } = useParams();
  const { data } = useDoctobyId(id as string);
  const { data: totalToken } = useDoctorSlots(id as string);
  const { data: allToken, refetch } = useAlltoken(id as string);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const today = dayjs();
  const daysInMonth = today.daysInMonth();
  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.format("DD-MM-YYYY")
  );
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  console.log("bb", today.format("DD-MM-YYYY"));

  const doctor: DoctorData = data?.data?.[0];
  const totalslots = totalToken?.data?.tokenPerDay;
  const AllToken: Token[] = allToken?.data;
  const slots = Array.from({ length: totalslots }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    const formattedDate = today.date(day).format("DD-MM-YYYY");

    if (today.date(day).isBefore(today, "day")) {
      return;
    }

    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    const handleTokenUpdate = () => {
      refetch();
    };

    socket.on("tokenUpdated", handleTokenUpdate);
    socket.on("otpVerified", handleTokenUpdate);
    return () => {
      socket.off("tokenUpdated", handleTokenUpdate);
      socket.off("otpVerified", handleTokenUpdate);
    };
  }, [refetch]);

  const handleSubmit = async (datas: object) => {
    try {
      await addToken(datas);
      setOpen(true);
      socket.emit("bookToken", datas);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-screen mt-32 mb-32 overflow-hidden">
      <Box
        p={2}
        sx={{
          maxWidth: isMobile ? "90%" : 950,
          margin: "auto",
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          minHeight: isMobile ? 600 : "auto",
        }}
      >
        <Box
          display="flex"
          gap={1}
          overflow="auto"
          p={1}
          sx={{
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "darkgray",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "pink" },
          }}
        >
          {days.map((day) => {
            const formattedDate = today.date(day).format("DD-MM-YYYY");
            const isPastDate = today.date(day).isBefore(today, "day");

            return (
              <Box
                key={day}
                onClick={() => !isPastDate && handleDateClick(day)}
                sx={{
                  minWidth: 40,
                  height: 50,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  cursor: isPastDate ? "not-allowed" : "pointer",
                  backgroundColor: isPastDate
                    ? "gray"
                    : selectedDate === formattedDate
                    ? "green"
                    : "#A5B79B",
                  color: isPastDate
                    ? "lightgray"
                    : selectedDate === formattedDate
                    ? "white"
                    : "black",
                  transition: "0.3s",
                  opacity: isPastDate ? 0.5 : 1,
                }}
              >
                <Typography fontWeight="bold" fontSize={14}>
                  {day}
                </Typography>
                <Typography fontSize={10}>{today.format("MMM")}</Typography>
              </Box>
            );
          })}
        </Box>

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          mt={5}
          gap={2}
          justifyContent="center"
          textAlign={isMobile ? "center" : "left"}
        >
          <Avatar
            src={doctor?.profileImage || "/doctor.jpg"}
            sx={{
              width: isMobile ? 90 : 100,
              height: isMobile ? 90 : 100,
              border: "2px solid gray",
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {doctor?.doctor?.name}
            </Typography>
            <Typography variant="body2" color="gray">
              {doctor?.specialization[0]}
            </Typography>
            <Typography variant="body2" color="gray">
              {doctor?.hospital}
            </Typography>
            <Typography
              variant="body2"
              color="blue"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              View Doctor&apos;s Profile &gt;&gt;
            </Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography fontWeight="bold" color="green">
            Available Tokens
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(8, 1fr)"}
            gap={1}
            mt={5}
          >
            {slots.map((slot) => {
              const isBooked = AllToken?.some(
                (token) =>
                  token.date === selectedDate && token.tokenNumber === slot
              );

              return (
                <Button
                  key={slot}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                  variant={selectedSlot === slot ? "contained" : "outlined"}
                  disabled={isBooked}
                  sx={{
                    backgroundColor: isBooked
                      ? "red"
                      : selectedSlot === slot
                      ? "green"
                      : "#D4E6B5",
                    color: isBooked
                      ? "white"
                      : selectedSlot === slot
                      ? "white"
                      : "black",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: isMobile ? "8px" : "10px",
                    padding: isMobile ? "2px 3px" : "3px 4px",
                    minWidth: isMobile ? 25 : 30,
                    height: isMobile ? 25 : 30,
                    "&:hover": {
                      backgroundColor: isBooked ? "red" : "green",
                      color: "white",
                    },
                  }}
                >
                  {slot}
                </Button>
              );
            })}
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="success"
            disabled={!selectedSlot}
            onClick={() =>
              handleSubmit({
                date: selectedDate,
                tokenNumber: selectedSlot,
                doctorId: doctor?.doctor?._id,
              })
            }
          >
            Confirm
          </Button>
        </Box>
      </Box>
      <OTPVerification open={open} onClose={handleClose} id={id as string} />
    </div>
  );
};

export default AddToken;
