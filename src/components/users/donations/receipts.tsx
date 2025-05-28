"use client";
import React, { useRef, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

interface DonationUser {
  _id: string;
  email: string;
  name: string;
  phone: string;
}

interface Donation {
  _id: string;
  amount: number;
  date: string;
  orderId: string;
  paymentId: string;
  paymentMethod: string;
  status: string;
  type: string;
  user: DonationUser | string;
}

interface DonationResponse {
  success: boolean;
  data: Donation;
}

// Fetch function
const fetchDonationDetails = async (userId: string | null): Promise<Donation> => {
  if (!userId) {
    throw new Error("No user id provided");
  }
  const response = await axiosInstance.get<DonationResponse>(`/donation/getUserReceipt/${userId}`);
  console.log(response.data, "data");
  return response.data.data;
};

interface ReceiptContentProps {
  donation: Donation;
}

// eslint-disable-next-line react/display-name
const ReceiptContent = forwardRef<HTMLDivElement, ReceiptContentProps>(
  ({ donation }, ref) => (
    <div
      ref={ref}
      id="receipt"
      className="bg-white p-6 rounded-lg w-[500px] mx-auto border border-gray-300"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <div className="border-b pb-3 mb-3 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          💌 Vital Aid
        </h1>
        <p className="text-sm text-gray-600">Official Donation Receipt</p>
      </div>

      <div className="mb-3">
        <h2 className="font-semibold text-lg mb-1 border-b pb-1">
          👤 Donor Information
        </h2>
        <p>
          <span className="font-medium">Name:</span>{" "}
          {typeof donation.user === "string" ? donation.user : donation.user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span>{" "}
          {typeof donation.user === "string" ? "N/A" : donation.user.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          {typeof donation.user === "string" ? "N/A" : donation.user.phone}
        </p>
      </div>

      <div className="mb-3">
        <h2 className="font-semibold text-lg mb-1 border-b pb-1">
          💰 Donation Details
        </h2>
        <p>
          <span className="font-medium">Donation Type:</span> {donation.type}
        </p>
        <p>
          <span className="font-medium">Amount:</span> ₹{donation.amount.toFixed(2)}
        </p>
        <p>
          <span className="font-medium">Status:</span> {donation.status.toUpperCase()}
        </p>
        <p>
          <span className="font-medium">Payment Method:</span> {donation.paymentMethod}
        </p>
      </div>

      <div className="mb-3">
        <h2 className="font-semibold text-lg mb-1 border-b pb-1">
          🔖 Transaction Details
        </h2>
        <p>
          <span className="font-medium">Order ID:</span> {donation.orderId}
        </p>
        <p>
          <span className="font-medium">Payment ID:</span> {donation.paymentId}
        </p>
      </div>

      <div className="border-t pt-2 text-center text-xs text-gray-500">
        <p>
          <span className="font-medium">Date:</span> {new Date(donation.date).toLocaleString()}
        </p>
        <p>Thank you for your generous donation!</p>
        <p>Vital Aid © {new Date().getFullYear()}</p>
      </div>
    </div>
  )
);

const Receipt = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? null;
  console.log("userId", userId);
  const router = useRouter();


  const { data, isLoading, error } = useQuery<Donation>({
    queryKey: ["donation", userId],
    queryFn: () => fetchDonationDetails(userId),
    enabled: Boolean(userId),
  });

  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrintAlternative = () => {
    if (!receiptRef.current) {
      console.error("Receipt reference is null");
      return;
    }
    const printContent = receiptRef.current.innerHTML;
    const printWindow = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Receipt</title>
            <style>
              body { font-family: "Times New Roman", Times, serif; padding: 20px; }
              .bg-white { background: #fff; }
              .rounded-lg { border-radius: 8px; }
              .p-6 { padding: 1.5rem; }
              .text-center { text-align: center; }
              .border { border: 1px solid #e5e7eb; }
              .border-gray-300 { border-color: #d1d5db; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      router.push("/user/donationHome");

    } else {
      console.error("Could not open print window");
    }
  };

  if (isLoading) return <Spinner/>
  if (error)
    return (
      <p className="text-center mt-8">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen space-y-6">
      {data && <ReceiptContent ref={receiptRef} donation={data} />}
      <button
        onClick={handlePrintAlternative}
        className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
      >
        Print Receipt
      </button>
    </div>
  );
};

export default Receipt;
