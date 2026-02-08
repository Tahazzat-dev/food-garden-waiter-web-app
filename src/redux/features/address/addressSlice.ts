
import { ITable, TAddress, TCustomer } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    customers: TCustomer[];
    address: TAddress[];
    tables: ITable[];
}

const initialState: TInitialState = {
    customers: [],
    address: [],
    tables: []
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
        },
        setTables: (state, action: PayloadAction<ITable[]>) => {
            state.tables = action.payload
        }
    }
})


export const { setTables, setAddress, setAllCustomers } = addressSlice.actions;
export default addressSlice.reducer;
