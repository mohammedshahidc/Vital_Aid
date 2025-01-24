// features/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";

interface UserState {
  user: {
    email: string | null;
    id: string | null;
    token: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

// Login User Thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log('hi2');
      
      const response = await axiosInstance.post("/api/auth/login", credentials);
      const { data } = response;

      Cookies.set(
        "user",
        JSON.stringify({
          email: data.user.email,
          token: data.token,
          id: data.user.id,
        }),
        { expires: 7 } 
      );

      return {
        email: data.user.email,
        id: data.user.id,
        token: data.token,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to log in"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
