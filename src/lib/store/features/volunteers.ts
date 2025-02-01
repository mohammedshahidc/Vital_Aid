import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorManager from "@/utils/axiosErrormanager";
import axiosInstance from "@/utils/axios";

export interface Volunteer {
    _id: string;
    name: string;
    phone: number;
    gender: 'male' | 'female';
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image: string;
}

interface volunteerState{
    volunteer:Volunteer|null,
    allVolunteers:Volunteer[]|null,
    error:string |null,
    isLoading:boolean
}

export const addVolunteer = createAsyncThunk<
  Volunteer,
  FormData,
  { formData: FormData; rejectValue: string }
>('addVolunteer', async (formData , { rejectWithValue }) => {
    try {
       
        const response = await axiosInstance.post('/volunteers/add',formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }})

        return response.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorManager(error)); 
    }
});

export const getAllvolunteers=createAsyncThunk<Volunteer[],void,{ rejectValue: string }>('getVolunteers',async(_, {rejectWithValue })=>{
    try {
       const response=await axiosInstance.get('/volunteers/getall')
    return response.data.data
    } catch (error) {
       return rejectWithValue(axiosErrorManager(error));
    }
   })







const initialState:volunteerState={
    volunteer:null,
    allVolunteers:null,
    error:null,
    isLoading:false
}

const volunteerSlice=createSlice({
    name:'volunteer',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addVolunteer.pending,(state)=>{
            state.error=null
            state.isLoading=true
        })
        .addCase(addVolunteer.fulfilled,(state)=>{
            state.error=null
            state.isLoading=true

        })
        .addCase(addVolunteer.rejected,(state,action)=>{
            state.error= action.payload||'an error occured'
            state.isLoading=false
        })

        .addCase(getAllvolunteers.pending,(state)=>{
            state.error=null
            state.isLoading=true
        })
        .addCase(getAllvolunteers.fulfilled,(state,action)=>{
            state.error=null
            state.isLoading=false
            state.allVolunteers=action.payload

        })
        .addCase(getAllvolunteers.rejected,(state,action)=>{
            state.error= action.payload||'an error occured'
            state.isLoading=false
        })
    }

})

export default volunteerSlice.reducer