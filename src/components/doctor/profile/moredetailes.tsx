"use client";

import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Grid} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DoctorDetails } from "./doctorProfile";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Dayjs } from "dayjs";
// import { useDoctorSlots } from "@/lib/Query/hooks/useDoctorProfile";
// import { io } from "socket.io-client";
// import { Token } from "@/components/users/Token/addToken";
import toast from "react-hot-toast";
// import { socket } from "@/lib/socket/socketinstanc";


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
    // const fetchToken=async()=>{
    //     const response=await axiosInstance.get("/doctors/alltoken")
    //     console.log('alltoken:',response.data.data);
    //     return response.data.data
    // }
    // useEffect(() => {
    //     fetchToken(); 
    
      
    //     const handleTokenUpdate = (newToken: Token) => {
    //       console.log("⚡ Token updated:", newToken);
    //       fetchToken();
    //     };
    
    //     socket.on("tokenUpdated", handleTokenUpdate);
    
    //     return () => {
    //       socket.off("tokenUpdated", handleTokenUpdate); 
    //     };
    //   }, []);
    
    // const { data,refetch } = useDoctorSlots();
    // const slots: Appointment[] = data?.data || [];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const slotData = {
           startingTme: selectedStartingTime?.format("hh:mm A"), 
            endingTime: selectedEndingTime?.format("hh:mm A"),
            
        };

        try {
            await axiosInstance.put('/doctors/updateavailability', slotData);
            toast.success("available time edited successfully")
        } catch (error) {
            axiosErrorManager(error);
            console.log(error);
        }
    };
console.log('time:',doctor);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3, mt: 4, width: "100%", maxWidth: "900px" }}>
            

                {/* Add Slots Section */}
                <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: "bold", color: "green" }}>
                    Edit Availability
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
