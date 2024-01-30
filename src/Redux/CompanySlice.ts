import Coupon from "../Models/Coupon";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../Models/Category";

export interface CompanyState{
    couponValue:Coupon[];
    categoryValue:Category[];
    // lastUpdated: Date
}

export const initState:CompanyState={
    couponValue:[],
    categoryValue:[]
    // lastUpdated: new Date()
}
export const companySlice= createSlice({
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
        },
        add:(state, action: PayloadAction<Coupon>)=>{
            state.couponValue.push(action.payload);
        },
        update:(state, action:PayloadAction<Coupon>)=>{
            const indexToUp = state.couponValue.findIndex(e=>e.id === action.payload.id);
            if (indexToUp >= 0)
                state.couponValue[indexToUp] = action.payload;

        },
        remove:(state, action:PayloadAction<number>)=>{
            const indexToDelete = state.couponValue.findIndex(e=>e.id === action.payload);
            if(indexToDelete >= 0)
                state.couponValue.splice(indexToDelete,1);
        }
    }
    
});

export const {fetchCoupons, fetchCategories, add, update, remove} = companySlice.actions;
export default companySlice.reducer;