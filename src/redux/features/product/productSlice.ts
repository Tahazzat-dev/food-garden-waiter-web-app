import { TCartProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    cartProducts: TCartProduct[];
}

const initialState: IInitialState = {
    cartProducts: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCartProducts: (state, action: PayloadAction<TCartProduct[] | null>) => {
            state.cartProducts = action.payload || [];
        },
        updateCartProduct: (state, action: PayloadAction<{ product: TCartProduct, id: string }>) => {
            state.cartProducts = state.cartProducts.map(prod => {
                if (prod.id === action.payload.id) {
                    return action.payload.product;
                }
                return prod;
            });
        },
        addCartProduct: (state, action: PayloadAction<TCartProduct>) => {
            state.cartProducts.push(action.payload);
        },
        removeCartProduct: (state, action: PayloadAction<string>) => {
            console.log("Removing product with id:", action.payload);
            state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
        }
    },
});

export const { setCartProducts, addCartProduct, removeCartProduct, updateCartProduct } = productSlice.actions;
export default productSlice.reducer;
