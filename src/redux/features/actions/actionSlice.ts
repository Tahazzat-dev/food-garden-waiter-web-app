import { TCartIconposition } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    EXPAND: null | string;
    prev_action: null | string;
    preventScrolling: boolean;
    cartIconPosition: TCartIconposition | null;
    // openImageTransitionModal: boolean;
    // transitionImage: ITransitionImage | null;
    // temp
    fetchOrders: boolean;
}

const initialState: IInitialState = {
    EXPAND: null,
    prev_action: null,
    preventScrolling: false,
    fetchOrders: true,
    // transitionImage: null,
    cartIconPosition: null,
    // openImageTransitionModal: true,
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
        // toggleOpenImageTransitionModal(state, action: { payload: boolean }) {
        //     state.openImageTransitionModal = action.payload
        // },
        // updateTransitionImage(state, action: { payload: ITransitionImage }) {
        //     state.transitionImage = action.payload
        // },
    },
});

export const {
    SET_EXPAND,
    updatePreventScrolling,
    updateFetchOrders,
    updateCartIconPosition,
    // toggleOpenImageTransitionModal,
    // updateTransitionImage
} = actionsSlice.actions;
export default actionsSlice.reducer;

