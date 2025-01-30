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
    allEquipment:Equipment[]|null 
    isLoading: boolean;           
    error: string | null;   
}    

const initialState: EquipmentState = {
    equipment: null, 
    allEquipment:null,
    isLoading: false, 
    error: null,      
};

export const addnewEquipment = createAsyncThunk<
    Equipment, 
    FormData,
    { rejectValue: string } 
>(
    'addequipment',
    async (formData, { rejectWithValue }) => { 
        try {
            const response = await axiosInstance.post('/equipment/addequipment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.data; 
        } catch (error) {
           
            return rejectWithValue(axiosErrorManager(error));
        }
    }
);



export const getallEquipment=createAsyncThunk<Equipment[],void,{ rejectValue: string }>('getequipments',async(_, {rejectWithValue })=>{
 try {
    const response=await axiosInstance.get('/equipment/getequipments')
 return response.data.data
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
        .addCase(getallEquipment.pending,(state)=>{
            state.error=null
            state.isLoading=true
        })

        .addCase(getallEquipment.fulfilled,(state,action:PayloadAction<Equipment[]>)=>{
            state.error=null
            state.allEquipment=action.payload
            state.isLoading=false
        })

        .addCase(getallEquipment.rejected,(state,action)=>{
            state.error=action.payload || "An unknown error occurred"
            state.isLoading=false
        })

        //add new equipments
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
