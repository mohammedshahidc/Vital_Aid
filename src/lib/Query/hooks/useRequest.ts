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

const fetchloginedcount=async()=>{
    const response=await axiosInstance.get(`/users/getloginedCount`)
    return response.data
}

export const useCountFetch = () => {
    const { data: count = ""} = useQuery({
        queryKey: ["login count"],
        queryFn: () =>fetchloginedcount(),
    });
    return {count}
};

const fetchequipmentcount=async()=>{
    const response=await axiosInstance.get(`/equipment/getTotalCount`)
    return response.data.data
}

export const useEquCountFetch = () => {
    const { data: eqcount = [] } = useQuery({
        queryKey: ["equip count"],
        queryFn: () =>fetchequipmentcount(),
    });
    return {eqcount}
};

