import React from "react";
import { Box,  Typography } from "@mui/material";





const HowItWorks: React.FC = () => {
  return (
    <div>
      <Box sx={{ width: "100%", textAlign: "center", my: 2, p: 3,  borderRadius: 2}}>
      <Typography variant="h6" fontWeight="bold">
        available Blood donors
      </Typography>
     
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
      Need a blood donor? Here Is a list of volunteers ready to help. Browse,
      connect, and save lives!
      </Typography>
     
    </Box>
 
    </div>
  );
};

export default HowItWorks;
