"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { useAppSelector } from "@/lib/store/hooks";
import Spinner from "@/components/ui/spinner";

interface Donation {
  _id: string;
  amount: number;
  date: string;
  orderId: string;
  paymentId: string;
  paymentMethod: string;
  status: string;
  type: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  } | string;
}

function DonationDetails() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? null;

  const { data, isLoading, error } = useQuery<Donation[]>({
    queryKey: ["donations", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/donation/getAllDonationsById/${userId}`);
      return response.data.data;
    },
    enabled: Boolean(userId),
  });

  if (isLoading) return <Spinner/>
  if (error) return <p className="text-center mt-8 text-lg">Error: {(error as Error).message}</p>;

  return (
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Donation Details</h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((donation) => (
            <div key={donation._id} className="p-6 bg-white rounded-lg shadow border border-gray-200">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{donation.type}</h2>
                <p className="text-gray-600">
                  <strong>Amount:</strong> ₹{donation.amount.toFixed(2)}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(donation.date).toLocaleString()}
                </p>
              </div>
             
              <div className="mb-4">
                <p className="text-gray-600">
                  <strong>Status:</strong>{" "}
                  <span className="uppercase font-medium">{donation.status}</span>
                </p>
                <p className="text-gray-600">
                  <strong>Payment Method:</strong> {donation.paymentMethod}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No donations found.</p>
      )}
    </div>
  );
}

export default DonationDetails;
