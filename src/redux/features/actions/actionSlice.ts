import { TActiveOrderDetailsModal, TCartIconposition, TOrderAction } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";



interface IInitialState {
    EXPAND: null | string;
    prev_action: null | string;
    preventScrolling: boolean;
    cartIconPosition: TCartIconposition | null;
    runExpandAnimation: boolean;
    orderAction: TOrderAction;
    activeOrderDetailsModal: TActiveOrderDetailsModal;

    // temporary
    fetchOrders: boolean;
}

const initialState: IInitialState = {
    EXPAND: null,
    prev_action: null,
    preventScrolling: false,
    runExpandAnimation: false,
    cartIconPosition: null,
    activeOrderDetailsModal: null,
    orderAction: "new",
    // temp
    fetchOrders: true,
};

const actionsSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        SET_EXPAND(state, action: { payload: string | null }) {
            state.EXPAND = action.payload;
        },
        updatePrevAction(state, action: { payload: string | null }) {
            state.prev_action = action.payload;
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

        updateActiveOrderDetailsModal(state, action: { payload: TActiveOrderDetailsModal }) {
            state.activeOrderDetailsModal = action.payload
        },

        udpateOrderAction(state, action: { payload: TOrderAction }) {
            state.orderAction = action.payload
        },
    },
});

export const {
    SET_EXPAND,
    updatePreventScrolling,
    updateFetchOrders,
    updateCartIconPosition,
    toggleRunExpandAnimation,
    updatePrevAction,
    udpateOrderAction,
    updateActiveOrderDetailsModal
} = actionsSlice.actions;
export default actionsSlice.reducer;

