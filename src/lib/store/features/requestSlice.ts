
import { createSlice } from "@reduxjs/toolkit";


type RequestStatus = "pending" | "accepted" | "delivered" | "cancelled" | null;
export interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface Equipment {
    _id: string;
    name: string;
    quantity: number;
    description: string;
    image:string
  }
  
  export interface Request {
    _id: string;
    user: User |null;
    equipment: Equipment |null;
    location: string;
    status: RequestStatus
    __v: number;
  }

  interface requestState{
    allRequest:Request[]|null,
    request:Request|null,
    isLoading:boolean,
    error:string|null

  }

  const initialState:requestState={
    allRequest:null,
    request:null,
    isLoading:false,
    error:null
  }




  const RequestSlice=createSlice({
    name:'request',
    initialState,
    reducers:{},
  
  })





  export default RequestSlice.reducer

  