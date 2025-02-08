import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchrequests=async(page:number)=>{
 const response=await axiosInstance.get(`/users/userrequest?page=${page}&limit=3`)
 return response.data
}

const fetchallrequest=async(page:number)=>{
    const response=await axiosInstance.get(`/admin/getallrequests?page=${page}&limit=5`)
    return response.data
}

export const useRequest = (page: number) => {
    return useQuery({
        queryKey: ["Request", page],
        queryFn: () =>fetchrequests(page),
    });
};

export const useAllRequest = (page: number) => {
    return useQuery({
        queryKey: ["allRequest", page],
        queryFn: () =>fetchallrequest(page),
    });
};
