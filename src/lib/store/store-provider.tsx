"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, persistor } from "./";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      {" "}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
