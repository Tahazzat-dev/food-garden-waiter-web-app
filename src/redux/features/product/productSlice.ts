import { TProduct } from "@/types/demoData";
import { TCartProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    cartProducts: TCartProduct[];
    favouriteProducts: TProduct[];
    modalProduct: TProduct | null;
}

const initialState: IInitialState = {
    cartProducts: [],
    favouriteProducts: [],
    modalProduct: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

        // cart products reducers
        setCartProducts: (state, action: PayloadAction<TCartProduct[] | null>) => {
            state.cartProducts = action.payload || [];
        },
        setModalProduct: (state, action: PayloadAction<TProduct | null>) => {
            state.modalProduct = action.payload;
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
        },


        // favourite products reducers
        setFavouriteProducts: (state, action: PayloadAction<TProduct[] | null>) => {
            state.favouriteProducts = action.payload || [];
        },

        addFavouriteProduct: (state, action: PayloadAction<TProduct>) => {
            state.favouriteProducts.push(action.payload);
        },

        removeFavouriteProduct: (state, action: PayloadAction<string>) => {
            state.favouriteProducts = state.favouriteProducts.filter(product => product.id !== action.payload);
        }
    },
});

export const {
    setCartProducts,
    setModalProduct,
    addCartProduct,
    removeCartProduct,
    updateCartProduct,
    setFavouriteProducts,
    addFavouriteProduct,
    removeFavouriteProduct
} = productSlice.actions;
export default productSlice.reducer;
