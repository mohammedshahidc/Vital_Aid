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
  totalPages: number;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  totalPages: 0
};


export const fetchEvents = createAsyncThunk<{ events: Event[]; totalPages: number }, { page: number, limit: number }, { rejectValue: string }>(
  "events/fetchEvents",
  async ({page,limit}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/events/getevents?page=${page}&limit=${limit}`);
      return {
        events: response.data.events,
        totalPages: response.data.totalPages
      };
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);


export const deleteEvent = createAsyncThunk<string, string, { rejectValue: string }>(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/events/deleteEvent/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);


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
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<{ events: Event[]; totalPages: number }>) => {
        state.loading = false;
        state.events = action.payload.events;
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchEvents.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch events";
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.events = state.events.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete event";
      });
  },
});

export default eventsSlice.reducer;

