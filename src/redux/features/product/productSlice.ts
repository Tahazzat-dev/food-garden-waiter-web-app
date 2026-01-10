import { TCartProduct, TOrder, TProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    cartProducts: TCartProduct[];
    favouriteProducts: TProduct[];
    modalProduct: TProduct | null;
    hasOfferedProducts: boolean;
    showOfferedMark: boolean;
    pendingOrders: TOrder[]
}

const initialState: IInitialState = {
    cartProducts: [],
    favouriteProducts: [],
    modalProduct: null,
    hasOfferedProducts: false,
    showOfferedMark: false,
    pendingOrders: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setModalProduct: (state, action: PayloadAction<TProduct | null>) => {
            state.modalProduct = action.payload;
        },

        setShowOfferedMark: (state, action: PayloadAction<boolean>) => {
            state.showOfferedMark = action.payload;
        },

        setPendingOrders: (state, action: PayloadAction<TOrder[]>) => {
            state.pendingOrders = action.payload;
        },

        setHasOfferedProducts: (state, action: PayloadAction<boolean>) => {
            state.hasOfferedProducts = action.payload;
        },

        // cart products reducers
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
            state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
        },
        clearCartProducts: (state) => {
            state.cartProducts = [];
        },

        // favourite products reducers
        setFavouriteProducts: (state, action: PayloadAction<TProduct[] | null>) => {
            state.favouriteProducts = action.payload || [];
        },

        addFavouriteProduct: (state, action: PayloadAction<TProduct>) => {
            state.favouriteProducts.push(action.payload);
        },

        removeFavouriteProduct: (state, action: PayloadAction<number>) => {
            state.favouriteProducts = state.favouriteProducts.filter(product => product.id !== action.payload);
        }
    },
});

export const {
    setCartProducts,
    setPendingOrders,
    setHasOfferedProducts,
    setShowOfferedMark,
    setModalProduct,
    addCartProduct,
    removeCartProduct,
    clearCartProducts,
    updateCartProduct,
    setFavouriteProducts,
    addFavouriteProduct,
    removeFavouriteProduct
} = productSlice.actions;
export default productSlice.reducer;
