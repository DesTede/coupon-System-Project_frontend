import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import User from "../Models/User";

/**
 * Interface representing the shape of the authentication store state.
 */
export interface AuthState{
    token:string;
    user:User;
}

/**
 * The initial state of the authentication store.
 */
const initialState:AuthState = {
    user: sessionStorage.getItem("token") ? jwtDecode(sessionStorage.getItem("token")) : null,
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
}

/**
 * Redux slice for managing authentication-related state.
 */
export const authSlice = createSlice({
    name:"authentication",
    initialState:initialState,
    reducers:{
        login: (state, action: PayloadAction<string>) => {
            // save token to RAM, redux. gets deleted when the browser is closed or refreshed
            state.token = action.payload; 
            // also save token to Hard Disc (as file)
            sessionStorage.setItem("token", state.token);
            console.log(state.token)
            state.user = jwtDecode(action.payload);
        },

        logout: (state) => {
            state.token = "";
            state.user = null;
            sessionStorage.removeItem("token")
            sessionStorage.clear()
            
            
        }
    }
});

/**
 * Export the actions and reducer.
 */
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;