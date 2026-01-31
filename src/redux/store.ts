import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "./features/actions/actionSlice";
import addressApiSlice from "./features/address/addressApiSlice";
import addressSlice from "./features/address/addressSlice";
import categoryApiSlice from "./features/category/categoryApiSlice";
import categorySlice from "./features/category/categorySlice";
import customerApiSlice from "./features/customer/customerApiSlice";
import localeReducer from "./features/locale/locale";
import productApiSlice from "./features/product/productApiSlice";
import productSlice from "./features/product/productSlice";
export const store = configureStore({
  reducer: {
    // packages: packagesSlice,
    locale: localeReducer,
    categorySlice: categorySlice,
    productSlice: productSlice,
    actions: actionSlice,
    address: addressSlice,

    [customerApiSlice.reducerPath]: customerApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [addressApiSlice.reducerPath]: addressApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApiSlice.middleware)
      .concat(categoryApiSlice.middleware)
      .concat(addressApiSlice.middleware)
      .concat(customerApiSlice.middleware)
}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
