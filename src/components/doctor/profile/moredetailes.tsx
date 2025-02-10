"use client";

import React, { useState } from "react";
import { Box, Card, Typography, TextField, Button, Grid} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DoctorDetails } from "./doctorProfile";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Dayjs } from "dayjs";
import { useDoctorSlots } from "@/lib/Query/hooks/useDoctorProfile";



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

const MoreDetailes: React.FC<MoreDetailsProps> = ({ doctor }) => {
    
   
    const [selectedStartingTime, setSelectedStartingTime] = useState<Dayjs | null>(null);
    const [selectedEndingTime, setSelectedEndingTimt] = useState<Dayjs | null>(null);
    

    
    const { data,refetch } = useDoctorSlots();
    const slots: Appointment[] = data?.data || [];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const slotData = {
           startingTme: selectedStartingTime?.format("hh:mm A"), 
            endingTime: selectedEndingTime?.format("hh:mm A"),
            
        };

        try {
            await axiosInstance.post('/doctors/addslot', slotData);
            refetch()
        } catch (error) {
            axiosErrorManager(error);
            console.log(error);
        }
    };
console.log('time:',doctor);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3, mt: 4, width: "100%", maxWidth: "900px" }}>
                
               
               

              
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "green" }}>
                  { ` Available Slots at ${doctor?.availability}`}
                </Typography>

                <Grid container spacing={2}>
                    {slots.length > 0 ? (
                        slots.map((slot) => (
                            <Grid item xs={12} sm={4} key={slot._id}>
                                <Card sx={{ p: 2, textAlign: "center", boxShadow: 2, borderRadius: 2 }}>
                                    <Typography variant="body1"><b>Place:</b> {doctor?.hospital}</Typography>
                                    <Typography variant="body1"><b>Time:</b> {`${slot.startingTime}-${slot.endingTime}`}</Typography>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ ml: 2, color: "gray" }}>No slots available.</Typography>
                    )}
                </Grid>

                {/* Add Slots Section */}
                <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: "bold", color: "green" }}>
                    Add Slots
                </Typography>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems="center">
                       
                        {/* Time Picker */}
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

                        {/* Submit Button */}
                        <Grid item xs={12} sm={4}>
                            <Button variant="contained" color="success" fullWidth type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Card>
        </LocalizationProvider>
    );
};

export default MoreDetailes;
