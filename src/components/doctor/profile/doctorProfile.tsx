"use client";

import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Avatar, Divider, Button, TextField } from "@mui/material";
import { useAppSelector } from "@/lib/store/hooks";
import { useDoctorSlots } from "@/lib/Query/hooks/useDoctorProfile";
import { FaPencilAlt } from "react-icons/fa";
import { updateTokenNumber } from "@/lib/Query/hooks/addToken";


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
    const { user } = useAppSelector((state) => state.auth)
    const { data: totalToken, refetch } = useDoctorSlots(user?.id as string)
    const [isHover, setIsHover] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [numberOfToken, setNumberOfToken] = useState<string>(totalToken?.data?.tokenPerDay as string)
    const handelHover = () => {
        setIsHover(true)
    }
    const handleUnhover = () => {
        setIsHover(false)
    }
    const handleEdit = () => {
        setEdit(!edit)
    }
    return (
        <div className="bg-white min-h-screen">
        <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 3, boxShadow: 3, borderRadius: 3, width: "100%", maxWidth: "900px" }}>


            <Box display="flex" alignItems="center" width="100%" px={2}>
                <Avatar
                    src={doctor?.profileImage || "/doctor-image.jpg"}
                    alt={doctor?.doctor?.name}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                />

                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {doctor?.doctor?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {doctor?.qualification?.join(", ") || "Qualification Not Available"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {doctor?.specialization?.join(", ") ||
                            "Specialization Not Available"}
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
                    <div
                        onMouseEnter={handelHover}
                        onMouseLeave={handleUnhover}
                        className="flex items-center justify-between w-1/5"
                    >
                        <Typography variant="body2" component="div" className="flex items-center">
                            {!edit ? (
                                <>
                                    <strong>Token/day:</strong> {totalToken?.data?.tokenPerDay}
                                </>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <TextField
                                        id="tokens"
                                        type="number"
                                        value={numberOfToken ?? ""}
                                        onChange={(e) => setNumberOfToken(e.target.value)}
                                        className="border p-1 rounded"
                                        variant="outlined"
                                        size="small"
                                        sx={{ width: '80px' }}
                                    />


                                    <Button onClick={() => {
                                        updateTokenNumber(Number(numberOfToken), refetch);
                                        setEdit(false);
                                    }}>
                                        Submit
                                    </Button>
                                </div>

                            )}
                        </Typography>


                        {isHover && (
                            <FaPencilAlt className="text-red-600 ml-2 cursor-pointer" onClick={handleEdit} />
                        )}
                    </div>

                </CardContent>
            </Box>

            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2, textAlign: "center" }}
            >
                {doctor?.description || "No description available."}
            </Typography>
        </Card>

        </div>
    );
};

export default DoctorProfile;
