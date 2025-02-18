"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'

import { cancellToken, useAlltokenforuser } from '@/lib/Query/hooks/addToken'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
    Box, Typography, CardContent, Card, CircularProgress
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { TokenType } from '@/lib/Query/hooks/addToken'
const AllToken = () => {
    const today = dayjs()
    const [date, setDate] = useState<Dayjs | null>(today);
    const { data, isError, isLoading, refetch } = useAlltokenforuser(date?.format('DD-MM-YYYY') || today.format('DD-MM-YYYY'))

    useEffect(() => {
        if (date) {
            refetch(); 
        }
    }, [date, refetch]); 

console.log("dataas:",data);

    const allToken: TokenType[] = data?.data

    
    return (
        <div>
            <Box
                sx={{
                    maxWidth: 800,
                    margin: "auto",
                    mt: 4,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    backgroundColor: "#ffffff"
                }}
            >
                <Typography variant="h6" color="primary" fontWeight="bold" mb={2} textAlign="center">
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
                                    sx: { width: "40%" }
                                }
                            }}
                        />
                    </Box>
                </LocalizationProvider>

                {isLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 100
                        }}
                    >
                        <CircularProgress color="primary" />
                    </Box>
                ) : isError ? (
                    <Typography color="error" textAlign="center">Failed to load appointments.</Typography>
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
                                position: "relative", // Add this line
                                '&:hover': {
                                    backgroundColor: "#BBDEFB",
                                    transform: "scale(1.02)",
                                    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
                                }
                            }}
                        >
                            {/* Profile Image */}
                            {appointment.doctorId.drDetails?.profileImage && (
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        mr: 2,
                                        flexShrink: 0
                                    }}
                                >
                                    <Image
                                        src={appointment.doctorId.drDetails?.profileImage}
                                        alt="Profile Image"
                                        width={60}
                                        height={60}
                                    />
                                </Box>
                            )}

                            {/* Appointment Details (Centered Vertically) */}
                            <Box sx={{ display: "flex", width: "100%" }}>

                                <select
                                    id="status"
                                    value={appointment.status}
                                    onChange={(e) => {
                                        if (e.target.value !== "Edit status"&&appointment.status!=="Completed") {
                                            cancellToken(appointment._id, e.target.value, refetch);
                                        }
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        zIndex: 1,
                                    }}
                                >
                                    <option value="Edit status">cancell satus</option>
                                    <option value="cancelled">cancell</option>
                                </select>

                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        flex: 1,
                                        height: "100%"
                                    }}
                                >
                                    <Typography variant="body1">
                                        <strong>Doctor Name:</strong> {appointment.doctorId.name || "N/A"}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Token Number:</strong> {appointment.tokenNumber || "N/A"}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Time:</strong> {appointment.doctorId.drDetails?.availability || "N/A"}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: appointment.status === "Completed" ? "green" :
                                                appointment.status === "cancelled" ? "red" :
                                                    appointment.status === "pending" ? "orange" : "inherit"
                                        }}
                                    >
                                        <strong>Status:</strong> {appointment.status || "N/A"}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        <strong>Phone:</strong> {appointment.doctorId.phone || "N/A"}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>


                    ))
                ) : (
                    <Typography textAlign="center">No appointments found for this date.</Typography>
                )}
            </Box>
        </div>
    )
}

export default AllToken
