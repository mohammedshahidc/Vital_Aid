// features/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";
import axiosErrorManager from "@/utils/axiosErrormanager";

interface UserState {
  user: {
    
    email: string | null;
    id: string | null;
    token: string | null;
    role:string |null
    profileImage:{
      originalProfile:string,
      thumbnail:string
    }|null
    phone:string|null
    name:string|null
  } | null;
  isLoading: boolean;
  error: string | null|undefined;
  userType:string| null
}

interface userRegistrationdata{
  name:string|null
  email:string |null
  phone:string |null
  password:string |null
 
}

type LoginFulfilledType = { email: string; id: string; token: string,role:string,profileImage:{originalProfile:string,thumbnail:string},phone:string,name:string};
type LoginArgumentType = { email: string; password: string };
type LoginRejectValueType = string;

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  userType:"User"
};

export const userRegistration = createAsyncThunk<void, userRegistrationdata, { rejectValue: string }>(
  'user/userRegistration',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", registrationData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      const errorMessage = axiosErrorManager(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk<LoginFulfilledType,LoginArgumentType,{rejectValue:LoginRejectValueType}>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    console.log('hi2');
    const response = await axiosInstance.post("/auth/userlogin", credentials,{withCredentials:true});
    console.log(response);
    
    const { data } = response;

    return {
      name:data.user.name,
      email: data.user.email,
      id: data.user.id,
      token: data.accessToken,
      role:data.user.role,
      profileImage: data.user.profileImage, 
      phone: data.user.phone,
    };
  } catch (error) {
    return rejectWithValue(
      axiosErrorManager(error)
    )
  }
}
);

export const loginDoctor = createAsyncThunk<LoginFulfilledType,LoginArgumentType,{rejectValue:LoginRejectValueType}>("Doctor/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/doctorlogin", credentials,{withCredentials:true});
    console.log(response);
    
    const { data } = response;

    return {
      name:data.user.name,
      email: data.user.email,
      id: data.user.id,
      token: data.accessToken,
      role:data.user.role,
      profileImage: data.user.profileImage, 
      phone: data.user.phone,
    };
  } catch (error) {
    return rejectWithValue(
      axiosErrorManager(error)
    )
  }
}
);


//login admin
export const loginadmin = createAsyncThunk<LoginFulfilledType,LoginArgumentType,{rejectValue:LoginRejectValueType}>("Admin/login", async (credentials, { rejectWithValue }) => {
  try {
    console.log('hi2');
    const response = await axiosInstance.post("/auth/adminlogin", credentials,{withCredentials:true});
    console.log(response);
    
    const { data } = response;
    console.log('role',data.user);

    return {
      name:data.user.name,
      email: data.user.email,
      id: data.user.id,
      token: data.accessToken,
      role:data.user.role,
      profileImage: data.user.profileImage, 
      phone: data.user.phone,
    };
  } catch (error) {
    return rejectWithValue(
      axiosErrorManager(error)
    )
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
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginFulfilledType>) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('user',action.payload.role)
        localStorage.setItem('username',action.payload.name)
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<LoginRejectValueType | undefined>) => {
        state.isLoading = false;
        state.error = action.payload ;
      }
    )
    .addCase(userRegistration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    // logindoctor

    .addCase(loginDoctor.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginDoctor.fulfilled, (state, action: PayloadAction<LoginFulfilledType>) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem('user',action.payload.role)
      localStorage.setItem('username',action.payload.name)
      state.error = null;
    })
    .addCase(loginDoctor.rejected, (state, action: PayloadAction<LoginRejectValueType | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ;
    }
  )

  //admin login
  .addCase(loginadmin.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(loginadmin.fulfilled, (state, action: PayloadAction<LoginFulfilledType>) => {
    state.isLoading = false;
    state.user = action.payload;
    localStorage.setItem('user',action.payload.role)
    localStorage.setItem('username',action.payload.name)
    state.error = null;
  })
  .addCase(loginadmin.rejected, (state, action: PayloadAction<LoginRejectValueType | undefined>) => {
    state.isLoading = false;
    state.error = action.payload ;
  }
)
 



    //user registration
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

export const { logout,setType } = userSlice.actions;
export default userSlice.reducer;
