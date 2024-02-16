import Company from "../Models/Company";
import Customer from "../Models/Customer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface representing the shape of the admin store state.
 */
export interface AdminStore{
    companies: Company[];
    customers: Customer[];
}

/**
 * The initial state of the admin store.
 */
const initState:AdminStore={
    companies: [],
    customers: [],
}

/**
 * Redux slice for managing admin-related state.
 */
export const adminSlice = createSlice({
    name: "admin",
    initialState:initState,
    reducers:{
        fetchCompanies:(state, action:PayloadAction<Company[]>)=>{
            state.companies = action.payload;
        },
        fetchCustomers:(state, action:PayloadAction<Customer[]>)=>{
            state.customers = action.payload;
        },
        addCompany:(state, action:PayloadAction<Company>)=>{
            state.companies.push(action.payload);
        },
        addCustomer:(state, action:PayloadAction<Customer>)=>{
            state.customers.push(action.payload);
        },
        updateCompany:(state, action:PayloadAction<Company>)=>{
            const indexToUp = state.companies.findIndex(c=>c.id === action.payload.id);
            if (indexToUp >= 0)
                state.companies[indexToUp] = action.payload;
        },
        updateCustomer:(state, action:PayloadAction<Customer>)=>{
            const indexToUp = state.customers.findIndex(c=>c.id === action.payload.id);
            if (indexToUp>= 0)
                state.customers[indexToUp] = action.payload;
        },
        removeCompany:(state, action:PayloadAction<number>)=>{
            const deleteIndex = state.companies.findIndex(c=>c.id === action.payload);
            if (deleteIndex >= 0)
                state.companies.splice(deleteIndex,1);
        },
        removeCustomer:(state, action:PayloadAction<number>)=>{
            const deleteIndex = state.customers.findIndex(c=>c.id === action.payload);
            if (deleteIndex >= 0)
                state.customers.splice(deleteIndex,1);
        }
    }
});

/**
 * Exporting the actions and reducer from the slice.
 */
export const {fetchCompanies,
              fetchCustomers,
              addCompany,
              addCustomer,
              updateCompany,
              updateCustomer,
              removeCompany,
              removeCustomer
             } = adminSlice.actions;
export default adminSlice.reducer;