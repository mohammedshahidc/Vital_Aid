import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export interface DrDetails {
    _id: string;
    qualification: string[];
    specialization: string[];
    profileImage: string;
    description: string;
    address: string;
    certificates: string[];
    hospital: string;
    availability: string;
}
export interface Doctor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    drDetails?: DrDetails;
}
export interface TokenType {
    _id: string;
    patientId: string;
    doctorId: Doctor;
    date: string;
    tokenNumber: number;
    status: string;
    isVerified:true
}

const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userState") || "null")
    : null;
console.log(user);

const fetchtokens = async (id: string) => {
    const response = await axiosInstance.get(`/users/getalltokens/${id}`);
    return response.data;
};


export const useAlltoken = (id: string) => {
    return useQuery({
        queryKey: ["allRequest"],
        queryFn: () => fetchtokens(id),
    });
};

export const addToken = async (datas: object) => {
    
    try {
        await axiosInstance.post("/users/createtoken", datas);
        toast.success(`check your email${user?.user?.email}`);
    } catch (error) {
        axiosErrorManager(error);
        console.log("error:", error);
       
    }
};

const fetchtokensfordoctors = async (id: string) => {
    const response = await axiosInstance.get(`/doctors/alltoken/${id}`);
    return response.data;
};

export const useAlltokenfordoctor = (id: string) => {
    return useQuery({
        queryKey: ["alltoken"],
        queryFn: () => fetchtokensfordoctors(id),
    });
};

const fetchtokenseachdoctors = async (date: string) => {
    const response = await axiosInstance.get(
        `/doctors/tokensofeachdoctors?date=${date}`
    );
    console.log("resssssssss",response);
    
    return response.data;
};

export const useAlltokenofeachdoctors = (date: string) => {
    console.log(date);
    
    return useQuery({
        queryKey: ["alltoken", date],
        queryFn: () => fetchtokenseachdoctors(date),
    });
};

export const editToken = async (
    id: string,
    status: string,
    refetch: () => void
) => {
    try {
        console.log("id:", id, "status:", status);

        await axiosInstance.put(`/doctors/updatetoken/${id}`, { status: status });
        refetch();
    } catch (error) {
        console.log("error:", error);
        axiosErrorManager(error);
    }
};

const fetchtokensforusers = async (date: string) => {
    const response = await axiosInstance.get(`/users/getalltoken?date=${date}`);
    return response.data;
};

export const useAlltokenforuser = (date: string) => {
    return useQuery({
        queryKey: ["alltoken"],
        queryFn: () => fetchtokensforusers(date),
    });
};


export const cancellToken = async (
    id: string,
    status: string,
    refetch: () => void
) => {
    try {
        console.log("id:", id, "status:", status);

        await axiosInstance.put(`/users/canceltoken/${id}`, { status: status });
        refetch();
        console.log("id:", id, "status:", status);

        await axiosInstance.put(`/users/canceltoken/${id}`, { status: status });
        refetch();
    } catch (error) {
        console.log("error:", error);
        axiosErrorManager(error);
    }
};


const getTokensForUsers = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/users/getalltokenofuser/${id}`);
        return response?.data?.data || []; 
    } catch (error) {
        axiosErrorManager(error);
        return [];
    }
};

export const useGetTokenForUser = (id: string) => {
    const {
        data: tokens = [], 
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["allTokenUser", id],
        queryFn: () => getTokensForUsers(id),
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    return { tokens, isLoading, error ,refetch};
};

export const updateTokenNumber=async(tokenperday:number,refetch:()=>void)=>{
    try {
        await axiosInstance.put('/doctors/updatetokennumber',{tokenperday:tokenperday})
        refetch()
    } catch (error) {
        console.log(error);
        axiosErrorManager(error)

    }
}