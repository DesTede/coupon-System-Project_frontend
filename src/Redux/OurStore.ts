import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";
import {adminSlice} from "./adminSlice";

export const authStore = configureStore({
    reducer:authSlice.reducer
});

export const adminStore = configureStore({
    reducer: adminSlice.reducer
});



export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch