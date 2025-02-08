import axiosErrorManager from "@/utils/axiosErrormanager";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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

//   export const getallRequest = createAsyncThunk<{ allRequest: Request[], totalPages: number }, number, { rejectValue: string }>('getallRequest', async (page, { rejectWithValue }) => {
//     try {
        
//         const response = await axiosInstance.get(`/users/userrequest?page=${page}&limit=3`)
//         return {
//             allRequest: response.data.allEquipment,
//             totalPages: response.data.totalPages
//         }
//     } catch (error) {
//         return rejectWithValue(axiosErrorManager(error));
//     }
// })


  const RequestSlice=createSlice({
    name:'request',
    initialState,
    reducers:{},
    // extraReducers:(builders)=>{
        
       
    // }
  })





  export default RequestSlice.reducer

  