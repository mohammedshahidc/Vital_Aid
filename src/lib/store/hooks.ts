//import { useDispatch, useSelector, useStore } from "react-redux";
//import type { AppDispatch, AppStore, RootState } from ".";

//export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
//export const useAppSelector = useSelector.withTypes<RootState>();
//export const useAppStore = useStore.withTypes<AppStore>();


// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected => useSelector(selector);
// export const useAppStore = () => useStore<AppStore>();
import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, AppStore, RootState } from ".";

// ✅ Correct way to define typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();
