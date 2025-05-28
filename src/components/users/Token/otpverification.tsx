
'use client'
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, Button } from "@mui/material";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import toast from "react-hot-toast";
import { useAlltoken } from "@/lib/Query/hooks/addToken";
import { socket } from "@/lib/socket/socketinstanc";

interface OTPVerificationProps {
    open: boolean;
    onClose: () => void;
    id:string
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ open, onClose,id}) => {
    const {  refetch } = useAlltoken(id as string);
    const otpRef = useRef<Array<HTMLInputElement | null>>([]);
    const [otp, setOtp] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
console.log(error);

    useEffect(() => {
        const handleTokenUpdate = () => {
          refetch();
        };
    
        socket.on("otpVerified", handleTokenUpdate);
    
        return () => {
          socket.off("otpVerified", handleTokenUpdate);
        };
      }, [refetch]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value.replace(/\D/g, "")

        if (value.length > 1) return;

        const newOtp = otp.split("");
        newOtp[index] = value;
        setOtp(newOtp.join(""));

        if (value && index < 5) {
            otpRef.current[index + 1]?.focus();
        }

        if (!value && index > 0) {
            otpRef.current[index - 1]?.focus();
        }

        if (newOtp.join("").length === 6) {
            setError(false);
        }
    };

    console.log('otp:', typeof (otp));
    // const handleVerification = () => {
    //     try {
    //         axiosInstance.put("/users/otpverification", { otp: otp })
    //         toast.success("Appointment Booked Successfully")
    //     } catch (error) {
    //         console.log(error);
    //         axiosErrorManager(error)
    //     }
    // }
    const handleVerification = async () => {
        try {
            const response = await axiosInstance.put("/users/otpverification", { otp });
    
            if (response.data.data?.status) {
                console.log('sdhfvsg:',response.data?.status);
                
                socket.emit("otpVerification", response.data?.data);
                toast.success("OTP Verified Successfully");
                onClose();
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
            axiosErrorManager(error);
        }
    };
    
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle textAlign="center">OTP Verification</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="gray" textAlign="center" sx={{ mb: 2 }}>
                    Enter the 6-digit OTP sent to your email.
                </Typography>

                <Grid container spacing={1} justifyContent="center">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Grid item key={index}>
                            <TextField
                                inputRef={(el) => (otpRef.current[index] = el)}
                                variant="outlined"
                                size="small"
                                inputProps={{
                                    maxLength: 1,
                                    style: { textAlign: "center", fontSize: 18, width: 30, height: 30 },
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(index, e)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            
            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button variant="contained" color="primary" fullWidth onClick={handleVerification}>
                    Verify OTP
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OTPVerification;
