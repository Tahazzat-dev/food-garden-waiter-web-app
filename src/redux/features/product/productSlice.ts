import { tableData } from "@/lib/demo-data";
import { setToStorage } from "@/lib/storage";
import { ITable, TCartProduct, TOrder, TProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    cartProducts: TCartProduct[];
    favouriteProducts: TProduct[];
    modalProduct: TProduct | null;
    hasOfferedProducts: boolean;
    showOfferedMark: boolean;
    pendingOrders: TOrder[];
    allProducts: TProduct[];

    // temp
    orders: TOrder[];
    tables: ITable[];
}

const initialState: IInitialState = {
    cartProducts: [],
    favouriteProducts: [],
    modalProduct: null,
    hasOfferedProducts: false,
    showOfferedMark: false,
    pendingOrders: [],
    allProducts: [],
    orders: [],
    tables: tableData
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setModalProduct: (state, action: PayloadAction<TProduct | null>) => {
            state.modalProduct = action.payload;
        },
        setAllProduct: (state, action: PayloadAction<TProduct[]>) => {
            state.allProducts = action.payload;
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

        updateCartProduct: (state, action: PayloadAction<{ product: TCartProduct, id: number }>) => {
            state.cartProducts = state.cartProducts.map(prod => {
                if (prod.id === action.payload.id) {
                    return action.payload.product;
                }
                return prod;
            });
        },

        addCartProduct: (state, action: PayloadAction<TCartProduct>) => {
            state.cartProducts.push(action.payload);
            setToStorage('cart_items', state.cartProducts);
        },

        removeCartProduct: (state, action: PayloadAction<number>) => {
            state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
            setToStorage('cart_items', state.cartProducts);
        },
        clearCartProducts: (state) => {
            state.cartProducts = [];
            setToStorage('cart_items', []);
        },

        // favourite products reducers
        setFavouriteProducts: (state, action: PayloadAction<TProduct[] | null>) => {
            state.favouriteProducts = action.payload || [];
        },

        addFavouriteProduct: (state, action: PayloadAction<TProduct>) => {
            state.favouriteProducts.push(action.payload);
            setToStorage('fav_items', state.favouriteProducts.map(item => item.id));
        },

        removeFavouriteProduct: (state, action: PayloadAction<number>) => {
            state.favouriteProducts = state.favouriteProducts.filter(product => product.id !== action.payload);
            setToStorage('fav_items', state.favouriteProducts.map(item => item.id));
        },

        // table
        updateTable: (state, action: PayloadAction<{ id: number, bookingStatus: boolean }>) => {
            state.tables = state.tables.map(table => table.id === action.payload.id ? { ...table, isBooked: action.payload.bookingStatus } : table)
        },

        // Temp
        setOrders: (state, action: PayloadAction<TOrder[]>) => {
            state.orders = action.payload
        },
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
    setAllProduct,
    updateTable,
    setFavouriteProducts,
    addFavouriteProduct,
    removeFavouriteProduct,
    setOrders
} = productSlice.actions;
export default productSlice.reducer;
