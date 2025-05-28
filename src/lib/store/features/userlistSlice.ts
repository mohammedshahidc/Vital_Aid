import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";


interface User {
  _id: string;
  profileImage: {
    originalProfile: string;
    thumbnail: string;
  };
  name: string;
  email: string;
  phone: string;
  admin: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
  blocked: boolean;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  totalPages: 0

};



export const fetchUsers = createAsyncThunk<
  { users: User[]; totalPages: number }, { page: number; limit: number }, { rejectValue: string }>(
    "users/fetchUsers",
    async ({ page, limit }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/users/getUsers?page=${page}&limit=${limit}`);
        return {
          users: response.data.users,
          totalPages: response.data.totalPages,
        };
      } catch (error) {
        return rejectWithValue(axiosErrorManager(error));
      }
    }
  );



const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ users: User[], totalPages: number }>) => {
        state.isLoading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users.";
      }
    )

  },

});


export default userSlice.reducer;
