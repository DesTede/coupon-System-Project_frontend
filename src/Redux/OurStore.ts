import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./AuthSlice";
import {adminSlice} from "./adminSlice";

/**
 * Redux store for managing authentication-related state.
 */
export const authStore = configureStore({
    reducer:authSlice.reducer
});

/**
 * Redux store for managing admin-related state.
 */
export const adminStore = configureStore({
    reducer: adminSlice.reducer
});


/**
 * Type representing the root state of the application.
 * This type is derived from the state of the authentication store.
 */
export type RootState = ReturnType<typeof authStore.getState>

/**
 * Type representing the dispatch function of the application.
 * This type is derived from the dispatch function of the authentication store.
 */
export type AppDispatch = typeof authStore.dispatch