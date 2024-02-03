import Company from "../Models/Company";
import Customer from "../Models/Customer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AdminStore{
    companies: Company[];
    customers: Customer[];
    // lastUpdated: Date;
}

const initState:AdminStore={
    companies: [],
    customers: [],
    // lastUpdated: new Date() // new date - now
}

export const adminSlice = createSlice({
    name: "admin",
    initialState:initState,
    reducers:{
        fetchCompanies:(state, action:PayloadAction<Company[]>)=>{
            state.companies = action.payload;
            // state.lastUpdated = new Date();
        },
        fetchCustomers:(state, action:PayloadAction<Customer[]>)=>{
            state.customers = action.payload;
            // state.lastUpdated = new Date();
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
            if (deleteIndex>= 0)
                state.companies.splice(deleteIndex,1);
        },
        removeCustomer:(state, action:PayloadAction<number>)=>{
            const deleteIndex = state.customers.findIndex(c=>c.id === action.payload);
            if (deleteIndex > 0)
                state.customers.splice(deleteIndex,1);
        }
    }
});

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