// features/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";
import axiosErrorManager from "@/utils/axiosErrormanager";
import toast from "react-hot-toast";

interface UserState {
  accessToken:string|null
  refreshToken:string|null
  user: {
    email: string | null;
    id: string | null;
    token: string | null;
    role: string | null;
    phone: string | null;
    name: string | null;
  } | null;
  isLoading: boolean;
  error: string | null | undefined;
  userType: string | null;
}

interface userRegistrationdata {
  name: string | null|undefined;
  email: string | null|undefined;
  phone: string | null|undefined;
  password: string | null;
}

type LoginFulfilledType = {
  email: string;
  id: string;
  token: string;
  refreshToken:string
  role: string;
  phone: string;
  name: string;
};
type LoginArgumentType = { email: string|null|undefined; password: string|null|undefined };
type LoginRejectValueType = string;

const getStoredUser = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userState");
  }
  return null;
};

const storedUser = getStoredUser();

const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : {
      user: null,
      isLoading: false,
      error: null,
      userType: "User",
    };

export const userRegistration = createAsyncThunk<
  void,
  userRegistrationdata,
  { rejectValue: string }
>("user/userRegistration", async (registrationData, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/register", registrationData);
    toast.success("registerd succesfully");
  } catch (error) {
    const errorMessage = axiosErrorManager(error);
    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  LoginFulfilledType,
  LoginArgumentType,
  { rejectValue: LoginRejectValueType }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/userlogin", credentials, {
      withCredentials: true,
    });

    const { data } = response;
    console.log('agsdy',data);
    
    toast.success("welcome to Vital Aid");
    return {
      name: data.user.name,
      email: data.user.email,
      id: data.user.id,
      token: data.accessToken,
      refreshToken:data.refreshToken,
      role: data.user.role,
      phone: data.user.phone,
    };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const loginDoctor = createAsyncThunk<
  LoginFulfilledType,
  LoginArgumentType,
  { rejectValue: LoginRejectValueType }
>("Doctor/login", async (credentials, { rejectWithValue }) => {
  
  try {
    const response = await axiosInstance.post(
      "/auth/doctorlogin",
      credentials,
      { withCredentials: true }
    );
    console.log(response);

    const { data } = response;

    toast.success("welcome doctor");

    return {
      name: data.user.name,
      email: data.user.email,
      id: data.user.id,
      token: data.accessToken,
      refreshToken:data.refreshToken,
      role: data.user.role,
      phone: data.user.phone,
    };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

export const loginadmin = createAsyncThunk<
  LoginFulfilledType,
  LoginArgumentType,
  { rejectValue: LoginRejectValueType }
>("Admin/login", async (credentials, { rejectWithValue }) => {
  try {
    console.log("hi2");
    const response = await axiosInstance.post("/auth/adminlogin", credentials, {
      withCredentials: true,
    });
    console.log(response);

    const { data } = response;
    

    return {
      name: data.user.name,
      email: data.user.email,
      id: data.user.id,
      token: data.accessToken,
      refreshToken:data.refreshToken,
      role: data.user.role,
  
      phone: data.user.phone,
    };
  } catch (error) {
    return rejectWithValue(axiosErrorManager(error));
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      Cookies.remove("user");
      localStorage.removeItem("userState");
      localStorage.clear()
      Cookies.remove("accessToken")
      Cookies.remove("refreshToken")

    },
    setType: (state, action) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginFulfilledType>) => {
          state.isLoading = false;
          state.user = action.payload;
          localStorage.setItem("user", action.payload.role);
          localStorage.setItem("username", action.payload.name);
          localStorage.setItem("userState", JSON.stringify(state));
          localStorage.setItem("accessToken", action.payload.token);
          Cookies.set("accessToken",action.payload.token)
          Cookies.set("refreshToken",action.payload.refreshToken)
          Cookies.set("user",action.payload.role)

          state.error = null;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<LoginRejectValueType | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(userRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginDoctor.fulfilled,
        (state, action: PayloadAction<LoginFulfilledType>) => {
          state.isLoading = false;
          state.user = action.payload;
          localStorage.setItem("user", action.payload.role);
          localStorage.setItem("username", action.payload.name);
          localStorage.setItem("userState", JSON.stringify(state));
          localStorage.setItem("accessToken", action.payload.token);
          Cookies.set("accessToken",action.payload.token)
          Cookies.set("refreshToken",action.payload.refreshToken)
          Cookies.set("user",action.payload.role)
          state.error = null;
        }
      )
      .addCase(
        loginDoctor.rejected,
        (state, action: PayloadAction<LoginRejectValueType | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      
      .addCase(loginadmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginadmin.fulfilled,
        (state, action: PayloadAction<LoginFulfilledType>) => {
          state.isLoading = false;
          state.user = action.payload;
          localStorage.setItem("user", action.payload.role);
          localStorage.setItem("username", action.payload.name);
          localStorage.setItem("userState", JSON.stringify(state));
          localStorage.setItem("accessToken", action.payload.token);
          Cookies.set("accessToken",action.payload.token)
          Cookies.set("refreshToken",action.payload.refreshToken)
          Cookies.set("user",action.payload.role)
          state.error = null;
        }
      )
      .addCase(
        loginadmin.rejected,
        (state, action: PayloadAction<LoginRejectValueType | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addCase(userRegistration.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setType } = userSlice.actions;
export default userSlice.reducer;
