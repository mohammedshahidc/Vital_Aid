"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Rating, Card } from "@mui/material";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import toast from "react-hot-toast";

interface ReviewFormProps {
  doctorId: string;
  refetch: () => void;
  setOpen: (open: boolean) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({doctorId,refetch,setOpen}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
const handleSubmit=async()=>{
    try {
        await axiosInstance.post("/users/addreview",{doctorId,rating,comment})
        setOpen(false)
        toast.success("Review Added Successfully")
        refetch()
    } catch (error) {
        console.log(error);
        axiosErrorManager(error)
        
    }
}

  return (
    <Card
      sx={{
        maxWidth: 500,
        p: 3,
        mx: "auto",
        mt: 4,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="primary" textAlign="center" fontWeight="bold">
        Rate Your Doctor
      </Typography>

      {/* Rating Selector */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Rating
          name="doctor-rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          size="large"
        />
      </Box>

      {/* Comment Input */}
      <TextField
        label="Write a review"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2,scrollbarWidth:"none"}}
        
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth disabled={!rating} onClick={handleSubmit}>
        Add
      </Button>
    </Card>
  );
};

export default ReviewForm;
