import { kitchenOrders, tableData } from "@/lib/demo-data";
import { setToStorage } from "@/lib/storage";
import { ITable, KitchenOrder, TCartProduct, TOrder, TProduct } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    cartProducts: TCartProduct[];
    cartTotal: number;
    favouriteProducts: TProduct[];
    modalProduct: TProduct | null;
    hasOfferedProducts: boolean;
    categoryActiveSlide: number | null;
    showOfferedMark: boolean;
    pendingOrders: TOrder[];
    allProducts: TProduct[];
    kitchenOrders: KitchenOrder[];
    detailsOrder: TOrder | null;

    // temp
    orders: TOrder[];
    tables: ITable[];
}

const initialState: IInitialState = {
    cartProducts: [],
    cartTotal: 0,
    favouriteProducts: [],
    categoryActiveSlide: null,
    modalProduct: null,
    hasOfferedProducts: false,
    showOfferedMark: false,
    pendingOrders: [],
    allProducts: [],
    kitchenOrders: kitchenOrders,
    detailsOrder: null,
    orders: [],
    tables: tableData
};


const calculateTotal = (products: TCartProduct[]): number => {
    return products.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
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
            state.cartTotal = calculateTotal(state.cartProducts);
        },

        updateCartProduct: (state, action: PayloadAction<{ product: TCartProduct, id: number }>) => {
            state.cartProducts = state.cartProducts.map(prod =>
                prod.id === action.payload.id ? action.payload.product : prod
            );
            state.cartTotal = calculateTotal(state.cartProducts);
            setToStorage('cart_items', state.cartProducts);
        },

        addCartProduct: (state, action: PayloadAction<TCartProduct>) => {
            state.cartProducts.push(action.payload);
            state.cartTotal = calculateTotal(state.cartProducts);
            setToStorage('cart_items', state.cartProducts);
        },

        removeCartProduct: (state, action: PayloadAction<number>) => {
            state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload);
            state.cartTotal = calculateTotal(state.cartProducts);
            setToStorage('cart_items', state.cartProducts);
        },

        clearCartProducts: (state) => {
            state.cartProducts = [];
            state.cartTotal = 0;
            setToStorage('cart_items', []);
        },

        updateCategoryActiveSlide: (state, action: PayloadAction<number>) => {
            state.categoryActiveSlide = action.payload;
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

        updateKitchenOrderItemStatus: (state, action: PayloadAction<{ id: number, itemId: number }>) => {
            const { id, itemId } = action.payload;
            const order = state.kitchenOrders.find(o => o.id === id);
            if (!order) return;

            const item = order.items.find(item => item.id === itemId);
            if (item) {
                item.status = item.status === "pending" ? "success" : "pending";
            }
        },
        updateDetailsOrder: (state, action: PayloadAction<TOrder | null>) => {
            state.detailsOrder = action.payload;
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
    updateCategoryActiveSlide,
    updateKitchenOrderItemStatus,
    setFavouriteProducts,
    addFavouriteProduct,
    removeFavouriteProduct,
    updateDetailsOrder,
    setOrders
} = productSlice.actions;
export default productSlice.reducer;
