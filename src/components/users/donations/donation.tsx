"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Read URL params
import { useCreateOrder } from "@/lib/Query/hooks/useDonation";
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { useAppSelector } from "@/lib/store/hooks";
import { Box,  TextField, Button, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { Payment, Person, Email, Phone } from "@mui/icons-material"; // Material Icons
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): Razorpay;
    };
  }

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    theme: {
      color: string;
    };
  }

  interface Razorpay {
    open(): void;
  }
}

const DonatePage = () => {
  const { mutate, isPending } = useCreateOrder();
  const { user } = useAppSelector((state) => state.auth);
  const [amount, setAmount] = useState<number>(500);
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "johndoe@example.com",
    contact: user?.phone || "0000000000",
  });

  const router=useRouter()
  const searchParams = useSearchParams();
  const donationType = searchParams.get("type"); 
  const donationAmount = searchParams.get("amount");

  useEffect(() => {
    if (donationAmount) {
      setAmount(Number(donationAmount));
    }
  }, [donationAmount]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded.");
    script.onerror = () => console.error("Failed to load Razorpay script.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (amount < 1) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (!user?.id) {
      toast.error("Please log in to donate.");
      return;
    }

    const razorpayKey =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "your_default_key";

    mutate(
      { amount, userId: user.id, type: donationType ||"genaral" },
      {
        onSuccess: (order) => {
          const options: RazorpayOptions = {
            key: razorpayKey,
            amount: order.amount,
            currency: order.currency,
            name: "VitalAid",
            description: "Donation Payment",
            order_id: order.orderId,
            handler: async (response) => {
              try {
                const verifyRes: AxiosResponse = await axiosInstance.post(
                  "/donation/verifyPayment",
                  {
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                    amount: order.amount / 100,
                    type: donationType,
                    userId:user.id,
                  }
                );

                if (verifyRes.data.success) {
                  router.push('/user/donationRecipt')
                  toast.success("Payment successful! 🎉");
        
                } else {
                  toast.error("Payment verification failed. ❌");
                }
              } catch (error) {
                console.error("Error during payment verification:", error);
                alert(
                  "An error occurred during payment verification. Please try again later."
                );
              }
            },
            prefill: formData,
            theme: { color: "#3399cc" },
          };

          const razor = new window.Razorpay(options);
          razor.open();
        },
        onError: (err) => {
          alert("Failed to create order. Please try again.");
          console.log(err);
        },
      }
    );
  };

  const donationImage =
    donationType === "equipment"
      ? "/equipment-donation.jpg"
      : "/general-donation.jpg";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={3}
      bgcolor="#f5f5f5"
    >
      <Box
        bgcolor="white"
        borderRadius={2}
        p={4}
        maxWidth="900px"
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
      >
        <Box flex={1}>
          <Image
            src={donationImage}
            alt="Donation Type"
            width={500}
            height={300}
            objectFit="cover"
            style={{ borderRadius: "8px", width: "100%", height: "auto", }}
          />
          <Box mt={3}>
            <TextField
              fullWidth
              label="Enter Donation Amount (₹)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              variant="outlined"
              InputProps={{
                startAdornment: <Payment color="action" />,
              }}
            />
          </Box>
        </Box>

        <Box flex={1} p={3}>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Support VitalAid
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <Person color="action" />,
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <Email color="action" />,
            }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <Phone color="action" />,
            }}
          />

          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            
            size="large"
            onClick={handlePayment}
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={20} /> : null}
            sx={{ mt: 3, py: 1.5, fontSize: "1.1rem",color:"orange" }}
          >
            {isPending ? "Processing..." : `Donate ₹${amount}`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DonatePage;