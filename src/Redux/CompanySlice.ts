import Coupon from "../Models/Coupon";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CompanyState{
    value:Coupon[];
    // lastUpdated: Date
}

export const initState:CompanyState={
    value:[],
    // lastUpdated: new Date()
}
export const companySlice= createSlice({
    name:"coupons",
    initialState:initState,
    reducers:{
        fetch:(state, action: PayloadAction<Coupon[]>)=> {
            state.value = action.payload;
            // state.lastUpdated = new Date();
        },
        add:(state, action: PayloadAction<Coupon>)=>{
            state.value.push(action.payload);
        },
        update:(state, action:PayloadAction<Coupon>)=>{
            const indexToUp = state.value.findIndex(e=>e.id === action.payload.id);
            if (indexToUp >= 0)
                state.value[indexToUp] = action.payload;

        },
        remove:(state, action:PayloadAction<number>)=>{
            const indexToDelete = state.value.findIndex(e=>e.id === action.payload);
            if(indexToDelete >= 0)
                state.value.splice(indexToDelete,1);
        }
    }
    
});

export const {fetch, add, update, remove} = companySlice.actions;
export default companySlice.reducer;