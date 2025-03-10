"use client";
import React, { useState } from "react";
import { Box, Card, CardContent, IconButton, Typography, Avatar, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material"; 
import AddReview from "./addReview";
import { ReviewType } from "../../users/dashbord/reviewSection";

interface ReviewSectionProps {
  reviews: ReviewType[];
  userId: string;
  refetch:()=>void
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, userId,refetch }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});

  const toggleReadMore = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box mt={4}>
      {/* Section Header with Edit Icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold" color="textPrimary">
          Reviews
        </Typography>
        <IconButton onClick={() => setIsReviewModalOpen(true)} color="primary">
          <EditIcon />
        </IconButton>
      </Box>

      {/* Review List */}
      <CardContent>
        {reviews?.length > 0 ? (
          reviews.map((review) => {
            const isExpanded = expandedReviews[review._id] || false;
            const previewText = review.reviewText.slice(0, 100);
            const isLongReview = review.reviewText.length > 100;
            
            return (
              <Card key={review._id} sx={{ p: 2, borderRadius: 2, boxShadow: 2, mb: 2, bgcolor: "grey.100" }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={review.doctorId.profileImage || "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"} alt={review.doctorId.name} />
                  <Typography variant="body1" fontWeight="bold">
                    {review?.doctorId?.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textPrimary" mt={1}>
                  {isExpanded ? review.reviewText : previewText}
                  {isLongReview && (
                    <Button color="primary" size="small" onClick={() => toggleReadMore(review._id)}>
                      {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                  )}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Card>
            );
          })
        ) : (
          <Typography variant="body2" color="textSecondary">
            No reviews yet
          </Typography>
        )}
      </CardContent>

      {/* Review Dialog Component */}
      <AddReview open={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} userId={userId} refetch={refetch}/>
    </Box>
  );
};

export default ReviewSection;
