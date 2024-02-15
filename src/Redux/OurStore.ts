import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";
import {adminSlice} from "./adminSlice";

export const authStore = configureStore({
    reducer:authSlice.reducer
});

export const adminStore = configureStore({
    reducer: adminSlice.reducer
});

// export const companyStore = configureStore({
//     reducer:companySlice.reducer
// });

// export const discoveryStore = configureStore({
//     reducer:discoverySlice.reducer
// });


export type RootState = ReturnType<typeof authStore.getState>
export type AppDispatch = typeof authStore.dispatch