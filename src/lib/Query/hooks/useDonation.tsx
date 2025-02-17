import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";


const createOrder = async (amount: number, userId: string) => {
  const response = await axiosInstance.post("/donation/createOrder", { amount, userId });
  return response.data; 
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: ({ amount, userId,type }: { amount: number; userId: string ,type:string}) => createOrder(amount, userId),
  });
};


const fetchAllDonation=async()=>{
  const response=await axiosInstance.get('/donation/allDonations');
  console.log(response,'donation amount');
  
  return response.data;
}


export const useDonation = () => {
  return useQuery({
    queryKey: ["donations"],
    queryFn: fetchAllDonation
  });
};