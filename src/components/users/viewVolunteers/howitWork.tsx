import React, { JSX } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';


interface StepType {
  label: string;
  icon: JSX.Element;
}

const steps: StepType[] = [
  { label: "Browse our volunteers.", icon: <ContentPasteSearchIcon /> },
  { label: " Contact them directly..", icon: <LocalPhoneOutlinedIcon /> },
  { label: "Get the support you need..", icon: <ContactPhoneOutlinedIcon /> },
 
];

const HowItWorks: React.FC = () => {
  return (
    <div>
      <Box sx={{ width: "100%", textAlign: "center", my: 2, p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Volunteers Support
      </Typography>
     
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
      Need a volunteer? Here is a list of volunteers ready to help. Browse,
      connect, and seek help!
      </Typography>
     
    </Box>
    <Box sx={{ width: "100%", textAlign: "center", py: 4,}}>
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