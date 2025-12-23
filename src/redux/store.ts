"use client"
import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./features/locale/locale";
import categorySlice from "./features/category/categorySlice";
import productSlice from "./features/product/product";
export const store = configureStore({
  reducer: {
    // packages: packagesSlice,
    locale: localeReducer,
    categorySlice: categorySlice,
    productSlice: productSlice,

    // [authApi.reducerPath]:authApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi)
}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
