
import { TAddress } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    address: TAddress[]
}

const initialState: TInitialState = {
    address: []
}

const addressSlice = createSlice({
    name: "addressSlice",
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<TAddress[]>) => {
            state.address = action.payload
        }
    }
})


export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
