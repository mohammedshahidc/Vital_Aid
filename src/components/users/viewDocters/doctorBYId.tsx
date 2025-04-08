"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById, useDoctorReview } from "@/lib/Query/hooks/doctorById";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { IReview } from "@/lib/Query/hooks/doctorById";
import { LocationOn, Phone, Email, School, VerifiedUser, Star } from "@mui/icons-material";
import ReviewForm from "../Reviews/addReview";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";

interface DoctorInfo {
  email: string;
  name: string;
  phone: string;
  _id: string;
}

export interface DoctorData {
  description: string;
  doctor: DoctorInfo;
  profileImage: string;
  qualification: string[];
  specialization: string[];
  hospital: string;
  address: string;
  experience: string;
  consultationFee: string;
  availability: string;
}

export default function Doctor() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const { data, error, isLoading } = useQuery<DoctorData>({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id as string),
    enabled: !!id,
  });

  const [open, setOpen] = useState(false);
  const { data: doctorReviews, refetch } = useDoctorReview(id as string);

  if (isLoading) {
    return <Spinner/>
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" minHeight="50vh">
          <Alert severity="error" sx={{ maxWidth: 600 }}>
            Error fetching doctor details: {(error as Error).message}
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" minHeight="50vh">
          <Typography variant="h6" color="gray">
            No doctor details found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: "100%", mx: "auto", p: 3, bgcolor: "#f5f9fc"}}>
        
        <Card sx={{ mb: { xs: 2, md: 4 }, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 2 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography 
              variant="overline" 
              sx={{ color: "#94a3b8", letterSpacing: 1.5, fontWeight: 500, mb: 1, display: "block" }}
            >
              DOCTOR PROFILE
            </Typography>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  component="img"
                  src={data.profileImage || "/doctor.jpg"}
                  alt={data.doctor.name}
                  sx={{
                    width: "100%",
                    height: { xs: 200, sm: 220, md: 240 },
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={8} md={9}>
                <Typography variant="h4" fontWeight="700" color="#334155" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  Dr. {data.doctor.name}
                </Typography>
                
                <Typography variant="h6" color="#64748b" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  {data.specialization?.join(", ")}
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn sx={{ color: "#64748b", fontSize: 18 }} />
                    <Typography variant="body2" color="#64748b">
                      {data.address}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone sx={{ color: "#64748b", fontSize: 18 }} />
                    <Typography variant="body2" color="#64748b">
                      {data.doctor.phone}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ color: "#64748b", fontSize: 18 }} />
                    <Typography variant="body2" color="#64748b">
                      {data.doctor.email}
                    </Typography>
                  </Box>
                </Box>
                
                <Link href={`/user/doctors/booking/${data.doctor._id}`} passHref>
                  <Button
                    variant="contained"
                    fullWidth={isMobile}
                    sx={{
                      bgcolor: "#0284c7",
                      "&:hover": { bgcolor: "#0369a1" },
                      px: 3,
                      py: 1,
                      borderRadius: 1.5
                    }}
                  >
                    Book Appointment
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/* Biography and Details Section */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={7}>
            <Card sx={{ height: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 2 }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight="700" color="#334155" sx={{ mb: 2 }}>
                  Biography
                </Typography>
                <Typography variant="body2" color="#64748b" paragraph>
                  {data.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" fontWeight="700" color="#334155" sx={{ mb: 2 }}>
                      Education
                    </Typography>
                    
                    <List disablePadding>
                      {data.qualification?.map((qual, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <School sx={{ color: "#64748b" }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={qual}
                            primaryTypographyProps={{ 
                              variant: "body2", 
                              color: "#334155",
                              fontWeight: "500"
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" fontWeight="700" color="#334155" sx={{ mb: 2 }}>
                      Certification & Information
                    </Typography>
                    
                    <List disablePadding>
                      <ListItem disablePadding sx={{ mb: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <VerifiedUser sx={{ color: "#64748b" }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`Experience: ${data.experience || "2 years"}`}
                          primaryTypographyProps={{ 
                            variant: "body2", 
                            color: "#334155",
                            fontWeight: "500"
                          }}
                        />
                      </ListItem>
                      
                      <ListItem disablePadding sx={{ mb: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <VerifiedUser sx={{ color: "#64748b" }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`Consultation Fee: ${data.consultationFee || "Free"}`}
                          primaryTypographyProps={{ 
                            variant: "body2", 
                            color: "#334155",
                            fontWeight: "500"
                          }}
                        />
                      </ListItem>
                      
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <VerifiedUser sx={{ color: "#64748b" }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`Availability: ${data.availability}`}
                          primaryTypographyProps={{ 
                            variant: "body2", 
                            color: "#334155",
                            fontWeight: "500"
                          }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Reviews Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 2 }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box
                  display="flex"
                  flexDirection={isMobile ? "column" : "row"}
                  justifyContent="space-between"
                  alignItems={isMobile ? "flex-start" : "center"}
                  gap={isMobile ? 2 : 0}
                  mb={2}
                >
                  <Typography variant="h6" fontWeight="700" color="#334155">
                    Patient Reviews
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<Star />}
                    onClick={() => setOpen(true)}
                    sx={{ 
                      borderColor: "#64748b", 
                      color: "#64748b",
                      "&:hover": { borderColor: "#334155", color: "#334155" }
                    }}
                  >
                    Add Review
                  </Button>
                </Box>
                
                <Card className="scrollbar-none"
                  
                  sx={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    p: 0
                  }}
                  
                >
                  {doctorReviews?.length ? (
                    doctorReviews.map((review: IReview, index: number) => (
                      <Box 
                        key={index}
                        sx={{ 
                          p: { xs: 1.5, md: 2 }, 
                          mb: 2, 
                          bgcolor: "#f8fafc", 
                          borderRadius: 2,
                          border: "1px solid #e2e8f0"
                        }}
                      >
                        <Box display="flex" alignItems="center" mb={1}>
                          <Image
                            src={
                              review?.userId?.profileImage ||
                              "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"
                            }
                            alt={review?.userId?.name}
                            width={40}
                            height={40}
                            style={{
                              borderRadius: "50%",
                              marginRight: "12px",
                              objectFit: "cover",
                            }}
                          />
                          <Typography variant="subtitle2" fontWeight="500" color="#334155">
                            {review.userId.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="#64748b">
                          {review.comment}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      color="#94a3b8"
                      textAlign="center"
                      sx={{ py: 4 }}
                    >
                      No reviews yet. Be the first to add a review!
                    </Typography>
                  )}
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Review Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 1, md: 2 }
          }
        }}
      >
        <DialogTitle 
          textAlign="center"
          sx={{ 
            fontSize: { xs: 18, md: 20 }, 
            fontWeight: 600,
            color: "#334155"
          }}
        >
          Add a Review for Dr. {data.doctor.name}
        </DialogTitle>
        <DialogContent>
          <ReviewForm
            doctorId={id as string}
            refetch={refetch}
            setOpen={setOpen}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)} 
            color="error"
            variant="outlined"
            sx={{ borderRadius: 1.5 }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}