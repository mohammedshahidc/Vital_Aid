import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string[];
  location: string;
  organization: string;
  __v: number;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
};

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk<Event[], void, { rejectValue: string }>(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/events/getevents");
      
      return response.data.events; // Return the events array
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

// Create the slice
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload; // Update the events array
      })
      .addCase(fetchEvents.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch events";
      });
  },
});

export default eventsSlice.reducer;