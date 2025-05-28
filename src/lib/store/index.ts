import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/userSlice";
import userReducer from "./features/userlistSlice";
import EquipmentSlice from "./features/EquipmentSlice";
import volunteerSlice from "./features/volunteers";
import eventsReducer from "./features/eventSlice";
import donorsReducer from "./features/donorsSlice";


const authPersistConfig = {
  key: "auth",
  storage,
};


const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuthReducer,
      users: userReducer,
      equipments: EquipmentSlice,
      volunteers: volunteerSlice,
      events: eventsReducer,
      donors: donorsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
