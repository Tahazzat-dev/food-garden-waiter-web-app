import { TCategory } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    cartProducts: string[];
}

const initialState: IInitialState = {
    cartProducts: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCartProducts: (state, action: PayloadAction<string[] | null>) => {
            state.cartProducts = action.payload || [];
        },
        addCartProduct: (state, action: PayloadAction<string>) => {
            state.cartProducts.push(action.payload);
        },
        removeCartProduct: (state, action: PayloadAction<string>) => {
            state.cartProducts = state.cartProducts.filter(id => id !== action.payload);
        }
    },
});

export const { setCartProducts, addCartProduct, removeCartProduct } = productSlice.actions;
export default productSlice.reducer;
