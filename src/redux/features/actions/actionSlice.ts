import { TCartIconposition } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    EXPAND: null | string;
    prev_action: null | string;
    preventScrolling: boolean;
    cartIconPosition: TCartIconposition | null;
    runExpandAnimation: boolean;

    // temporary
    fetchOrders: boolean;
}

const initialState: IInitialState = {
    EXPAND: null,
    prev_action: null,
    preventScrolling: false,
    runExpandAnimation: false,
    cartIconPosition: null,

    // temp
    fetchOrders: true,
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

        updateCartIconPosition(state, action: { payload: TCartIconposition }) {
            state.cartIconPosition = action.payload
        },
        toggleRunExpandAnimation(state, action: { payload: boolean }) {
            state.runExpandAnimation = action.payload
        },
    },
});

export const {
    SET_EXPAND,
    updatePreventScrolling,
    updateFetchOrders,
    updateCartIconPosition,
    toggleRunExpandAnimation
} = actionsSlice.actions;
export default actionsSlice.reducer;

