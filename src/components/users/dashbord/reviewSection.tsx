import { DoctorType } from "@/components/doctor/patient/patient";
import { useReviews } from "@/lib/Query/hooks/useReport";
import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FaStethoscope } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

export interface ReviewType {
  _id: string;
  userId: string;
  doctorId: DoctorType;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function ReviewSection() {
  const { userReviews, refetch } = useReviews();
  
  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});
  
  const toggleReadMore = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderReviewText = (review: ReviewType) => {
    const MAX_LENGTH = 100;
    const isExpanded = expandedReviews[review._id];
    const isLongText = review.reviewText.length > MAX_LENGTH;

    if (!isLongText) {
      return <p>{review.reviewText}</p>;
    }

    return (
      <div>
        <p>
          {isExpanded
            ? review.reviewText
            : `${review.reviewText.substring(0, MAX_LENGTH)}...`}
        </p>
        <button
          onClick={() => toggleReadMore(review._id)}
          className="text-teal-500 hover:text-teal-700 text-sm font-medium mt-1 focus:outline-none"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>
    );
  };

  return (
    <div>
      <Card className="shadow-lg rounded-xl overflow-hidden border-t-4 border-teal-400">
        <div className="flex justify-between px-6 py-4 bg-gradient-to-r from--50 to-white">
          <h3 className="text-lg font-semibold text-gray-500 flex items-center">
            <FaStethoscope className="mr-2 h-4 w-4" />
            Review from doctor
          </h3>
          <MdRefresh size={29} className="text-teal-500 cursor-pointer" onClick={() => refetch()} />
        </div>
        <CardContent className="space-y-3 p-4">
          {userReviews?.length > 0 ? (
            userReviews.map((review: ReviewType) => (
              <div
                key={review._id}
                className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex items-start space-x-3 mb-2">
                  <div className="flex-shrink-0">
                    {review.doctorId?.profileImage ? (
                      <Image 
                        src={review?.doctorId?.profileImage} 
                        alt={`Dr. ${review?.doctorId?.name || ''}`}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        height={200}
                        width={200}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
                        <FaStethoscope />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">
                        Dr. {review.doctorId?.name || ''}
                      </h4>
                      <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="mt-1">
                      {renderReviewText(review)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm border border-gray-100 h-14 flex items-center justify-center text-gray-400">
              Reviews will appear after your appointment
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewSection;