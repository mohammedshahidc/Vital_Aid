import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

interface volunteerState {
    volunteer: Volunteer | null,
    allVolunteers: Volunteer[] | null,
    error: string | null,
    isLoading: boolean
    totalPages: number
}
type formvalue={
    imageUrl: string | null;
    name: string;
    phone: number | string;
    gender: "male" | "female" | null;
    image: File | null;
} 

export const addVolunteer = createAsyncThunk<
    Volunteer,
    formvalue,
    { formData: formvalue; rejectValue: string }
>('addVolunteer', async (formvalue, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/volunteers/add', formvalue)
        return response.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorManager(error));
    }
});

export const getAllvolunteers = createAsyncThunk<{ allVolunteers: Volunteer[], totalPages: number }, number, { rejectValue: string }>('getVolunteers', async (page, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/volunteers/getall?page=${page}&limit=5`)
        console.log(response.data);
        
        return {
            allVolunteers: response.data.allVolunteers,
            totalPages: response.data.totalPages
        }
    } catch (error) {
        return rejectWithValue(axiosErrorManager(error));
    }
})



const initialState: volunteerState = {
    volunteer: null,
    allVolunteers: null,
    error: null,
    isLoading: false,
    totalPages: 0
}

const volunteerSlice = createSlice({
    name: 'volunteer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addVolunteer.pending, (state) => {
                state.error = null
                state.isLoading = true
            })
            .addCase(addVolunteer.fulfilled, (state) => {
                state.error = null
                state.isLoading = true

            })
            .addCase(addVolunteer.rejected, (state, action) => {
                state.error = action.payload || 'an error occured'
                state.isLoading = false
            })

            .addCase(getAllvolunteers.pending, (state) => {
                state.error = null
                state.isLoading = true
            })

            .addCase(getAllvolunteers.fulfilled, (state, action: PayloadAction<{ allVolunteers: Volunteer[], totalPages: number }>) => {
                state.error = null
                state.isLoading = false
                state.allVolunteers = action.payload.allVolunteers
                state.totalPages = action.payload.totalPages

            })
            .addCase(getAllvolunteers.rejected, (state, action) => {
                state.error = action.payload || 'an error occured'
                state.isLoading = false
            })
    }

})

export default volunteerSlice.reducer