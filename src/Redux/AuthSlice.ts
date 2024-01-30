import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import User from "../Models/User";
import {companyStore} from "./OurStore";


// do switch-case on the ClientType type just like in the sever side.
// the client type is stored in the token, so we can decode it and get the client type and then do switch-case on it.
export interface AuthState{
    token:string;
    user:User;
}

const initState:AuthState = {
    user: sessionStorage.getItem("token") ? jwtDecode(sessionStorage.getItem("token")) : null,
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
}

export const authSlice = createSlice({
    name:"authentication",
    initialState:initState,
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
            
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;