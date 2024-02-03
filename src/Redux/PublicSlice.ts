import Coupon from "../Models/Coupon";
import {Category} from "../Models/Category";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PublicState{
    couponValue:Coupon[];
    categoryValue:Category[];
    // lastUpdated: Date
}

export const initState:PublicState={
    couponValue:[],
    categoryValue:[],
    // lastUpdated: new Date()
}
export const publicSlice= createSlice({
    name:"coupons",
    initialState:initState,
    reducers:{
        fetchCoupons:(state, action: PayloadAction<Coupon[]>)=> {
            state.couponValue = action.payload;
            // state.lastUpdated = new Date();
        },
        fetchCategories:(state, action: PayloadAction<Category[]>)=> {
            state.categoryValue = action.payload;
            // state.lastUpdated = new Date();
        }
    }

});

export const {fetchCoupons, fetchCategories} = publicSlice.actions;
export default publicSlice.reducer;