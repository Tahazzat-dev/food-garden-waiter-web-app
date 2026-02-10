import { TActiveOrderDetailsModal, TCartIconposition, TNotificationAction, TOrderAction } from "@/types/types";
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


    // notification identifier
    prevOnlneOrders: number;
    prevAllOrders: number;
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


    // notification identifier
    prevOnlneOrders: 0,
    prevAllOrders: 0
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

        updateNotificationAction(state, action: { payload: { field: TNotificationAction, value: number } }) {
            state[action.payload.field] = action.payload.value;
        }
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
    updateActiveOrderDetailsModal,
    updateNotificationAction
} = actionsSlice.actions;
export default actionsSlice.reducer;

