"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById, useDoctorReview } from "@/lib/Query/hooks/doctorById";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { IReview } from "@/lib/Query/hooks/doctorById";
import { Edit } from "@mui/icons-material";
import ReviewForm from "../Reviews/addReview";
import Image from "next/image";
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

  const { data, error, isLoading } = useQuery<DoctorData>({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id as string),
    enabled: !!id,
  });

  const [open, setOpen] = useState(false);
  const { data: DoctorReviews, refetch } = useDoctorReview(id as string)
console.log('sfyu:',id);

  if (isLoading)
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading doctor details...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" py={10}>
        <Alert severity="error">
          Error fetching doctor details: {(error as Error).message}
        </Alert>
      </Box>
    );

  if (!data)
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="gray">
          No doctor details found
        </Typography>
      </Box>
    );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={4}
      px={2}
    >
      <Card
        sx={{
          maxWidth: 900,
          width: "100%",
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <Avatar
              src={data.profileImage || "/doctor.jpg"}
              alt="Doctor Profile"
              sx={{ width: 140, height: 140, border: "3px solid #e0e0e0" }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold">
              {data?.doctor?.name}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="500" mt={1}>
              {data?.specialization?.join(", ")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data?.hospital}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              📍 {data?.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              📞 {data?.doctor?.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              ✉️ {data?.doctor?.email}
            </Typography>

            <Link href={`/user/doctors/booking/${data?.doctor?._id}`} passHref>
              <Button variant="contained" color="error" sx={{ mt: 3, px: 4, py: 1, fontSize: 16, bgcolor: "#450a0a" }}>
                Book Appointment
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          maxWidth: 900,
          width: "100%",
          mt: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {data?.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.primary"
            mt={2}
          >
            Qualifications
          </Typography>
          <List dense>
            {data?.qualification?.map((qual, index) => (
              <ListItem key={index}>
                <ListItemText primary={qual} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.primary"
            mt={2}
          >
            Additional Information
          </Typography>
          <List dense>

            <ListItem>
              <ListItemText primary={`Consultation Fee: ${data?.consultationFee || 'Free'}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Availability: ${data?.availability}`} />
            </ListItem>
          </List>
          <Box display="flex" flexDirection="column" alignItems="center" py={4} px={2}>
            {/* Reviews Header with Pencil Icon */}
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" maxWidth={900} mt={3}>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Reviews
              </Typography>
              <Tooltip title="Add a Review" placement="bottom">
                <Edit
                  sx={{
                    cursor: "pointer",
                    color: "gray",
                    "&:hover": { color: "black" },
                    fontSize: 24,
                  }}
                  onClick={() => setOpen(true)} 
                />
              </Tooltip>
            </Box>

            {/* Reviews Box */}
            <Box
              sx={{
                maxHeight: "250px",
                overflowY: "auto",
                mt: 2,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "#f9f9f9",
                width: "100%",
                maxWidth: 900,
                scrollbarWidth: "none"
              }}
            >
              {DoctorReviews?.length ? (
                DoctorReviews.map((review: IReview, index: number) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>

                    <Box flex={1} >
                    <Box display="flex" alignItems="center" mb={1}>
                                <Image
                                    src={review?.userId?.profileImage || "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"}
                                    alt={review?.userId?.name}
                                    width={50}
                                    height={50}
                                    style={{
                                        borderRadius: "50%",
                                        marginRight: "12px",
                                        backgroundColor: "#1976d2",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {review.userId.name}
                                </Typography>
                            </Box>
                      <Rating value={review.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {review.comment}
                      </Typography>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No reviews yet.
                </Typography>
              )}
            </Box>

            {/* Dialog Box for Adding Review */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
              <DialogTitle textAlign="center">Add a Review</DialogTitle>
              <DialogContent>
                <ReviewForm doctorId={id as string} refetch={refetch} setOpen={setOpen} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="error">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
