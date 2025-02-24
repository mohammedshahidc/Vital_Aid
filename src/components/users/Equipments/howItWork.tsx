import React, { JSX } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import { Place } from "@mui/icons-material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";


interface StepType {
  label: string;
  icon: JSX.Element;
}

const steps: StepType[] = [
  { label: "Select the equipment.", icon: <WheelchairPickupIcon /> },
  { label: "Enter the delivery address.", icon: <Place /> },
  { label: "Send the request", icon: <AssignmentOutlinedIcon /> },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="w-full">
      <Box
        sx={{
          width: "full",
          textAlign: "center",
        
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Medical Equipment for Patients
        </Typography>
       
      </Box>
      <Box sx={{ width: "100%", color: "black", textAlign: "center", py: 4 }}>
        <Stepper alternativeLabel>
          {steps.map((step, index) => (
            <Step
              key={index}
              sx={{
                color: "black",
                "& .MuiStepLabel-label": { color: "black" },
              }}
            >
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default HowItWorks;
