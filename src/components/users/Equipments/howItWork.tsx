import React, { JSX } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import { Place} from "@mui/icons-material";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { text } from "stream/consumers";

interface StepType {
  label: string;
  icon: JSX.Element;
}

const steps: StepType[] = [
  { label: "Select the required equipment.", icon: <WheelchairPickupIcon /> },
  { label: "Enter the delivery address.", icon: <Place /> },
  { label: "Send the request", icon: <AssignmentOutlinedIcon /> },
 
];

const HowItWorks: React.FC = () => {
  return (
    <div>
      <Box sx={{ width: "100%", textAlign: "center", my: 2, p: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Medical Equipment for Patients
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
        We provide essential medical equipment such as <strong>wheelchairs</strong> and <strong>stretchers</strong>  
        <br /> <strong>for free and temporary use</strong> to patients in need.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Our goal is to assist patients by offering necessary mobility and support equipment at no cost.  
        Whether it's for recovery after surgery, an injury, or temporary medical needs, our service ensures  
        that patients have access to the resources they require. We strive to make healthcare more accessible  
        by eliminating financial burdens and providing timely assistance.
      </Typography>
    </Box>
    <Box sx={{ width: "100%",  color: "black", textAlign: "center", py: 4,boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1) "}}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        How it Works
      </Typography>
      <Stepper alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} sx={{ color: "black", "& .MuiStepLabel-label": { color: "black" } }}>
            <StepLabel icon={step.icon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
  );
};

export default HowItWorks;
