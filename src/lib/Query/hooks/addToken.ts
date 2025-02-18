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
}


const fetchtokens = async (id: string) => {
    const response = await axiosInstance.get(`/users/getalltokens/${id}`)
    return response.data
}

export const useAlltoken = (id: string) => {
    return useQuery({
        queryKey: ["allRequest"],
        queryFn: () => fetchtokens(id),
    });
};

export const addToken = async (datas: object) => {
    console.log("datas", datas);
    try {
        await axiosInstance.post("/users/createtoken", datas)
        toast.success('appointment created successfully')
        
    } catch (error) {
        axiosErrorManager(error)
        console.log("error:", error);
        toast.error('this token already booked')
    }
}


const fetchtokensfordoctors = async (id: string) => {
    const response = await axiosInstance.get(`/doctors/alltoken/${id}`)
    return response.data
}

export const useAlltokenfordoctor = (id: string) => {
    return useQuery({
        queryKey: ["alltoken"],
        queryFn: () => fetchtokensfordoctors(id),
    });
};

const fetchtokenseachdoctors = async (date: string) => {
    const response = await axiosInstance.get(`/doctors/tokensofeachdoctors?date=${date}`)
    return response.data
}

export const useAlltokenofeachdoctors = (date: string) => {
    return useQuery({
        queryKey: ["alltoken", date],
        queryFn: () => fetchtokenseachdoctors(date),
    });
};

export const editToken = async (id: string, status: string,refetch: () => void) => {
    try {
        console.log('id:',id,"status:",status);
        
        await axiosInstance.put(`/doctors/updatetoken/${id}`, { status: status })
        refetch()
    } catch (error) {
        console.log("error:", error);
        axiosErrorManager(error)

    }
}


const fetchtokensforusers = async (date:string) => {
    const response = await axiosInstance.get(`/users/getalltoken?date=${date}`)
    return response.data
}

export const useAlltokenforuser = (date:string) => {
    return useQuery({
        queryKey: ["alltoken"],
        queryFn: () => fetchtokensforusers(date),
    });
};

export const cancellToken = async (id: string, status: string,refetch: () => void) => {
    try {
        console.log('id:',id,"status:",status);
        
        await axiosInstance.put(`/users/canceltoken/${id}`, { status: status })
        refetch()
    } catch (error) {
        console.log("error:", error);
        axiosErrorManager(error)

    }
}