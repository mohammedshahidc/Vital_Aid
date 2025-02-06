import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";

export interface Equipment {
    _id: string;
    name: string;
    image: string;
    quantity: number;
    description: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface EquipmentState {
    equipment: Equipment | null;
    allEquipment: Equipment[] | null
    isLoading: boolean;
    error: string | null;
    totalPages:number
}

const initialState: EquipmentState = {
    equipment: null,
    allEquipment: null,
    isLoading: false,
    error: null,
    totalPages:0
};

type formvalue={
    imageUrl: string | null;
    name: string;
    quantity: number | string;
    image: string| null;
    description: string;
} 

export const addnewEquipment = createAsyncThunk<
    Equipment,
    formvalue,
    { rejectValue: string }
>(
    'addequipment',
    async (formvalue, { rejectWithValue }) => {
        console.log("data",formvalue);
        
        try {
            const response = await axiosInstance.post('/equipment/addequipment', formvalue);
            console.log(response.data.data);
            return response.data.data;
            
        } catch (error) {

            return rejectWithValue(axiosErrorManager(error));
        }
    }
);





export const getallEquipment = createAsyncThunk<{ allEquipment: Equipment[], totalPages: number }, number, { rejectValue: string }>('getequipments', async (page, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/equipment/getequipments?page=${page}&limit=3`)
        return {
            allEquipment: response.data.allEquipment,
            totalPages: response.data.totalPages
        }
    } catch (error) {
        return rejectWithValue(axiosErrorManager(error));
    }
})
const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getallEquipment.pending, (state) => {
                state.error = null
                state.isLoading = true
            })

            .addCase(getallEquipment.fulfilled, (state, action: PayloadAction<{allEquipment:Equipment[],totalPages: number}>) => {
                state.error = null
                state.allEquipment = action.payload.allEquipment
                state.isLoading = false
                state.totalPages=action.payload.totalPages
            })

            .addCase(getallEquipment.rejected, (state, action) => {
                state.error = action.payload || "An unknown error occurred"
                state.isLoading = false
            })

        
            .addCase(addnewEquipment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addnewEquipment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.equipment = action.payload;
            })
            .addCase(addnewEquipment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "An unknown error occurred";
            });
    }
});

export default equipmentSlice.reducer;
