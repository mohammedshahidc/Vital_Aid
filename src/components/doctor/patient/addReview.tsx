"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import axiosErrorManager from "@/utils/axiosErrormanager";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  userId:string
  refetch:()=>void
}

const AddReview: React.FC<ReviewDialogProps> = ({ open, onClose,userId,refetch }) => {
const[reviewText,setReviewText]=useState<string>("")
    const handdlesubmit=async()=>{
        try {
            await axiosInstance.post('/doctors/adduserreview',{reviewText,userId})
            onClose()
            setReviewText("")
            refetch()
            toast.success("Review added successfully")
        } catch (error) {
            console.log('error:',error);
            axiosErrorManager(error)
        }
      
    }
  return (
    <Dialog open={open} onClose={onClose}  maxWidth="sm" fullWidth>
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handdlesubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReview;
