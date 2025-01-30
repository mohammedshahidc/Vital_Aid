import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/userSlice";  // Existing auth reducer
import userReducer from "./features/userlistSlice"; // Import your new users slice

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,  // Authentication slice
      users: userReducer, // Users list slice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
