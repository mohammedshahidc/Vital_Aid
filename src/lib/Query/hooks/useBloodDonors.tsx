import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
const fetchDonors=async()=>{

    const response=await axiosInstance.get('')
}