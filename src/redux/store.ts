import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./features/locale/locale";
import categorySlice from "./features/category/categorySlice";
import productSlice from "./features/product/productSlice";
import productApiSlice from "./features/product/productApiSlice";
import categoryApiSlice from "./features/category/categoryApiSlice";
import actionSlice from "./features/actions/actionSlice";
import addressSlice from "./features/address/addressSlice";
import addressApiSlice from "./features/address/addressApiSlice";
export const store = configureStore({
  reducer: {
    // packages: packagesSlice,
    locale: localeReducer,
    categorySlice: categorySlice,
    productSlice: productSlice,
    actions: actionSlice,
    address: addressSlice,

    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [addressApiSlice.reducerPath]: addressApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApiSlice.middleware).concat(categoryApiSlice.middleware).concat(addressApiSlice.middleware)
}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
