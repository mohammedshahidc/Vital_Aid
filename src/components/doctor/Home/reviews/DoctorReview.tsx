"use client"
import { IReview, useDoctorReviewforDoctors } from '@/lib/Query/hooks/doctorById'
import { Box, ListItem, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DoctorReview = () => {
    const { data: DoctorReviews } = useDoctorReviewforDoctors()
    
    console.log(DoctorReviews?.length || 0);
    

    
    

    return (
        <div className='bg-white min-h-screen'>
        <Box
            sx={{
                height: "screen",
                overflowY: "auto",
                mt: 2,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "#f9f9f9",
                width: "100%",
                maxWidth: 900,
                scrollbarWidth: "none",
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                sx={{
                    textAlign: "center",
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                }}
            >
                Reviews from Patients
            </Typography>

            {DoctorReviews?.length ? (
                DoctorReviews.map((review: IReview, index: number) => (
                    <ListItem key={index} alignItems="flex-start" sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
                        <Box flex={1}>
                            <Link href={`/doctor/patient/${review.userId._id}`}>
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
                            </Link>
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
        </div>
    )
}

export default DoctorReview
