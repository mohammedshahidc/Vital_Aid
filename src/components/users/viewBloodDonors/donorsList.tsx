"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Pagination,
  Step,
  StepLabel,
  Stepper,
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import Spinner from "@/components/ui/spinner";

export interface Donor {
  _id: string;
  name: string;
  BloodGroup: string;
  Phone: number;
  image: string[];
}

export interface DonorResponse {
  error: string;
  donors: Donor[];
  totalPages: number;
  totaldonor: number;
  currentPage: number;
}

interface StepType {
  label: string;
  icon: React.ReactNode;
}

const steps: StepType[] = [
  {
    label: "Find volunteers by their blood group",
    icon: <ContentPasteSearchIcon />,
  },
  {
    label: "Contact them directly for help",
    icon: <LocalPhoneOutlinedIcon />,
  },
  {
    label: "In case of urgent, contact multiple donors",
    icon: <ContactPhoneOutlinedIcon />,
  },
];

const bloodGroups = [
  { value: "", label: "All Blood Groups" },
  { value: "A+", label: "A+" },
  { value: "B+", label: "B+" },
  { value: "O+", label: "O+" },
  { value: "AB+", label: "AB+" },
  { value: "A-", label: "A-" },
  { value: "B-", label: "B-" },
  { value: "O-", label: "O-" },
  { value: "AB-", label: "AB-" },
];

const fetchDonors = async (page: number): Promise<DonorResponse> => {
  const response = await axiosInstance.get<DonorResponse>(
    `/donors/getDonors?page=${page}&limit=9`
  );
  return response.data;
};

const DonorsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading, error } = useQuery<DonorResponse, Error>({
    queryKey: ["donors", page],
    queryFn: () => fetchDonors(page),
    staleTime: 5000,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBloodGroup(e.target.value);
  };

  const handleCall = (phoneNumber: number) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const filteredDonors = data?.donors?.filter((donor) => {
    const matchesName = donor.name.toLowerCase().includes(filter.toLowerCase());
    const matchesGroup =
      selectedBloodGroup === "" ||
      donor.BloodGroup.trim().toUpperCase() === selectedBloodGroup.toUpperCase();
    return matchesName && matchesGroup;
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <Container>
        <Typography variant="body1" color="error" align="center" sx={{ my: 4 }}>
          Error fetching donors: {error.message}
        </Typography>
      </Container>
    );

  return (
    <Box component="main">
      <Box position="relative" width="100%" height={{ xs: 300, sm: 400, md: 500, lg: 600 }}>
        <Image
          src="https://i.pinimg.com/736x/b9/17/70/b917706f5b29e3b37c6b6009609d9e04.jpg"
          alt="Blood donors Banner"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box textAlign="center" px={2}>
            <Typography
              variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
              component="h1"
              fontWeight="bold"
              color="white"
              gutterBottom
            >
              Our Blood Donors
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              color="white"
              maxWidth="md"
              mx="auto"
            >
              Meet the dedicated individuals who Donate Blood for Free
            </Typography>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="lg">
        
        <Typography variant="h5" align="center" sx={{ mt: 5, mb: 3 }}>
          How it Works
        </Typography>
        
        <Box sx={{ width: "100%", mb: 6 }}>
          <Stepper 
            activeStep={-1} 
            alternativeLabel
            orientation={isMobile ? "vertical" : "horizontal"}
          >
            {steps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel icon={step.icon}>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            fullWidth={isMobile}
            value={filter}
            onChange={handleFilterChange}
            sx={{ width: { xs: "100%", sm: "auto", minWidth: { sm: 200 } } }}
          />
          
          <TextField
            select
            label="Blood Group"
            variant="outlined"
            size="small"
            fullWidth={isMobile}
            value={selectedBloodGroup}
            onChange={handleBloodGroupChange}
            sx={{ width: { xs: "100%", sm: "auto", minWidth: { sm: 200 } } }}
          >
            {bloodGroups.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {filteredDonors && filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <Grid item xs={12} sm={6} md={4} key={donor._id}>
                <Card 
                  elevation={2} 
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 4
                    },
                    borderRadius: 2
                  }}
                >
                  <CardContent sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    flexGrow: 1
                  }}>
                    <Box
                      sx={{
                        position: "relative",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        overflow: "hidden",
                        mb: 2,
                        border: "4px solid",
                        borderColor: "primary.light"
                      }}
                    >
                      <Image
                        src={donor.image[0]}
                        alt={`Photo of donor ${donor.name}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Typography variant="h6" component="h3" align="center" gutterBottom>
                      {donor.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                      📞 {donor.Phone}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: "error.main",
                        color: "white",
                        fontWeight: "bold",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        mt: 1,
                        display: "inline-block"
                      }}
                    >
                      {donor.BloodGroup}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<PhoneIcon />}
                      onClick={() => handleCall(donor.Phone)}
                      sx={{
                        py: 1.5,
                        borderRadius: "0 0 8px 8px",
                        "&:hover": {
                          bgcolor: "primary.dark"
                        },
                      }}
                    >
                      Contact Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" align="center">
                No donors found with the selected criteria.
              </Typography>
            </Grid>
          )}
        </Grid>

 
        <Box
          display="flex"
          justifyContent="center"
          sx={{ mt: 2, mb: 8 }}
        >
          <Pagination
            count={data?.totalPages ?? 1}
            page={data?.currentPage ?? 1}
            onChange={(_, value) => setPage(value)}
            color="primary"
            variant="outlined"
            shape="rounded"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DonorsList;