"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axiosInstance from "@/utils/axios";
import { useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";
import { useFetchreport } from "@/lib/Query/hooks/useReport";

interface AddReportModalProps {
  open: boolean;
  onClose: () => void;
}

interface ReportData {
  userid: string | null;
  age: string;
  name: string;
  height: string;
  weight: string;
  pressureRate: string;
  sugarRate: string;
  cholesterol: string;
  allergies: string;
  otherDiseases: string;
  aboutYou: string;
}

const AddReportModal: React.FC<AddReportModalProps> = ({ open, onClose }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [Loading, setLoading] = useState(false);
  const {refetch}=useFetchreport(user?.id??"")
  const [reportData, setReportData] = useState<ReportData>({
    userid: user?.id ?? null,
    name: "",
    age: "",
    height: "",
    weight: "",
    pressureRate: "",
    sugarRate: "",
    cholesterol: "",
    allergies: "",
    otherDiseases: "",
    aboutYou: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReportData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value, 
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "users/generatereport",
        reportData
      );
      console.log("Report Submitted:", response?.data?.report);

      setReportData({
        userid: user?.id ?? null,
        name: "",
        age: "",
        height: "",
        weight: "",
        pressureRate: "",
        sugarRate: "",
        cholesterol: "",
        allergies: "",
        otherDiseases: "",
        aboutYou: "",
      });

      toast.success("Your report is ready! Check it.");
      refetch()
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to generate report. Try again.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Medical Report</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          value={reportData.name}
          onChange={handleChange}
          margin="dense"
        />
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number" 
            variant="outlined"
            value={reportData.age}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Height"
            name="height"
            variant="outlined"
            value={reportData.height}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            variant="outlined"
            value={reportData.weight}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Pressure Rate"
            name="pressureRate"
            variant="outlined"
            value={reportData.pressureRate}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Sugar Rate"
            name="sugarRate"
            variant="outlined"
            value={reportData.sugarRate}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Cholesterol"
            name="cholesterol"
            variant="outlined"
            value={reportData.cholesterol}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Allergies"
            name="allergies"
            variant="outlined"
            value={reportData.allergies}
            onChange={handleChange}
            margin="dense"
          />
        </div>

        <TextField
          fullWidth
          label="Other Diseases"
          name="otherDiseases"
          variant="outlined"
          value={reportData.otherDiseases}
          onChange={handleChange}
          margin="dense"
        />
        {Loading && (
          <div className="text-center text-blue-600 font-medium mt-2">
            Generating your medical report with VitalAid AI... Please wait.
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={Loading}
          sx={{ textTransform: "none" }}
        >
          {Loading ? "Analyzing Data..." : "Generate Medical Report"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReportModal;
