import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/userSlice"; 
import userReducer from "./features/userlistSlice"; 
import EquipmentSlice from "./features/EquipmentSlice";
import eventsReducer from "./features/eventSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,  
      users: userReducer,
     equipments:EquipmentSlice,
     events: eventsReducer

    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
