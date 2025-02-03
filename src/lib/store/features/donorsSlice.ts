import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { ReactNode } from "react";

export interface Donor {
    Address: ReactNode;
    Phone: ReactNode;
    Age: ReactNode;
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    BloodGroup: ReactNode;
    Gender: ReactNode;
    image: string[];
    donatedAmount: number;
    date: string;
    __v: number;
  }

interface DonorsState {
  donors: Donor[];
  loading: boolean;
  error: string | null;
}

const initialState: DonorsState = {
  donors: [],
  loading: false,
  error: null,
};

export const fetchDonors = createAsyncThunk<Donor[], void, { rejectValue: string }>(
  "donors/fetchDonors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/donors/getdonors");
      return response.data.donors; 
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
export const deleteDonor = createAsyncThunk<string, string, { rejectValue: string }>(
  "donors/deletedonors",
  async (donorId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/donors/deleteDoner/${donorId}`);
      return donorId; 
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);
const donorsSlice = createSlice({
  name: "donors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonors.fulfilled, (state, action: PayloadAction<Donor[]>) => {
        state.loading = false;
        state.donors = action.payload;
      })
      .addCase(fetchDonors.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch donors";
      })
      .addCase(deleteDonor.pending, (state) => {
              state.loading = true;
            })
            .addCase(deleteDonor.fulfilled, (state, action: PayloadAction<string>) => {
              state.loading = false;
              state.donors = state.donors.filter((doner) => doner._id !== action.payload);
            })
            .addCase(deleteDonor.rejected, (state, action: PayloadAction<string | undefined>) => {
              state.loading = false;
              state.error = action.payload || "Failed to delete event";
            });
  },
});

export default donorsSlice.reducer;
