"use client";

import React from "react";
import { Box, Card, CardContent, Typography, Avatar, Divider } from "@mui/material";


export interface DoctorDetails {
    _id: string;
    doctor: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    qualification: string[];
    specialization: string[];
    availability?: string;
    hospital: string;
    profileImage: string;
    description: string;
    address: string;
    certificates: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Props {
    doctor: DoctorDetails;
   
}

const DoctorProfile: React.FC<Props> = ({ doctor }) => {
    return (
        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 3, boxShadow: 3, borderRadius: 3, width: "100%", maxWidth: "900px" }}>
            

            <Box display="flex" alignItems="center" width="100%" px={2}>
                <Avatar src={doctor?.profileImage || "/doctor-image.jpg"} alt={doctor?.doctor?.name} sx={{ width: 120, height: 120, marginRight: 2 }} />

                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {doctor?.doctor?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {doctor?.qualification?.join(", ") || "Qualification Not Available"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {doctor?.specialization?.join(", ") || "Specialization Not Available"}
                    </Typography>

                    <Divider sx={{ my: 1, borderColor: "blue" }} />

                    <Typography variant="body2">
                        <strong>Email:</strong> {doctor?.doctor?.email}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Ph No:</strong> {doctor?.doctor?.phone}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Address:</strong> {doctor?.address}
                    </Typography>
                </CardContent>
            </Box>
            
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: "center" }}>
                {doctor?.description || "No description available."}
            </Typography>
        </Card>
    );
};

export default DoctorProfile;
