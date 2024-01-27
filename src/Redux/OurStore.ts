import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";
import {adminSlice} from "./adminSlice";
import {companySlice} from "./CompanySlice";
import {publicSlice} from "./PublicSlice";

export const authStore = configureStore({
    reducer:authSlice.reducer
});

export const adminStore = configureStore({
    reducer: adminSlice.reducer
});

export const companyStore = configureStore({
    reducer:companySlice.reducer
});

export const publicStore = configureStore({
    reducer:publicSlice.reducer
});


export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch