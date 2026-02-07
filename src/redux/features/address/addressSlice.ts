
import { TAddress, TCustomer } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    customers: TCustomer[];
    address: TAddress[]
}

const initialState: TInitialState = {
    customers: [],
    address: []
}

const addressSlice = createSlice({
    name: "addressSlice",
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<TAddress[]>) => {
            state.address = action.payload
        },
        setAllCustomers: (state, action: PayloadAction<TCustomer[]>) => {
            state.customers = action.payload
        }
    }
})


export const { setAddress, setAllCustomers } = addressSlice.actions;
export default addressSlice.reducer;
