"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";

// Define the Donation interface matching your data
export interface Donation {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  amount: number;
  type: string;
  paymentId: string;
  orderId: string;
  paymentMethod: string;
  status: string;
  date: string; // use "date" as provided by your sample data
  receiptUrl?: string;
}

const fetchDonations = async (): Promise<Donation[]> => {
  const { data } = await axiosInstance.get("/donation/getAllDonations");
  console.log("data", data);
  console.log("data.data", data.data);
  return data.data;
};

const AdminDonations: React.FC = () => {
  const { data: donations, isLoading, error } = useQuery<Donation[]>({
    queryKey: ["donations"],
    queryFn: fetchDonations,
  });

  if (isLoading)
    return (
      <Box textAlign="center" mt={4}>
        <Typography>Loading donations...</Typography>
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" mt={4}>
        <Typography>Error loading donations.</Typography>
      </Box>
    );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Donations Table">
        <TableHead>
          <TableRow>
            <TableCell key="donor-name">Donor Name</TableCell>
            <TableCell key="email">Email</TableCell>
            <TableCell key="donation-type">Donation Type</TableCell>
            <TableCell key="amount">Amount</TableCell>
            <TableCell key="payment-method">Payment Method</TableCell>
            <TableCell key="status">Status</TableCell>
            <TableCell key="date">Date</TableCell>
            <TableCell key="receipt">Receipt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations?.map((donation) => (
            <TableRow key={donation._id}>
              <TableCell>{donation.user?.name || "N/A"}</TableCell>
              <TableCell>{donation.user?.email || "N/A"}</TableCell>
              <TableCell>{donation.type}</TableCell>
              <TableCell>{donation.amount}</TableCell>
              <TableCell>{donation.paymentMethod}</TableCell>
              <TableCell>{donation.status}</TableCell>
              <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {donation.receiptUrl ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(donation.receiptUrl, "_blank")}
                  >
                    View
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminDonations;
