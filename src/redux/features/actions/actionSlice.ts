import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    EXPAND: null | string;
    prev_action: null | string;
    preventScrolling: boolean;
    // cartIcon:

    // temp
    fetchOrders: boolean;
}

const initialState: IInitialState = {
    EXPAND: null,
    prev_action: null,
    preventScrolling: false,
    fetchOrders: true
};

const actionsSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        SET_EXPAND(state, action: { payload: string | null }) {
            state.prev_action = state.EXPAND;
            state.EXPAND = action.payload;
        },
        updatePreventScrolling(state, action: { payload: boolean }) {
            state.preventScrolling = action.payload;
        },

        // temp
        updateFetchOrders(state, action: { payload: boolean }) {
            state.fetchOrders = action.payload;
        },
    },
});

export const {
    SET_EXPAND,
    updatePreventScrolling,
    updateFetchOrders,
} = actionsSlice.actions;
export default actionsSlice.reducer;

