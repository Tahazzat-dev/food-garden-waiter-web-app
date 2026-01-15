import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQuery,
    tagTypes: ['Post'], // Used for automatic invalidation (refetching)
    endpoints: (builder) => ({
        // GET query for fetching data
        getCategoryProducts: builder.query({
            query: (id) => `/products?category_id=${id}`,
            providesTags: ['Post'],
        }),
        getAllProducts: builder.query({
            query: () => `/products`,
        }),

        confirmOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data
            })
        }),

        getAllOrders: builder.query({
            query: (q) => `/orders?${q}`
        }),
        getCustomerInfo: builder.query({
            query: (phone) => `/customers/${phone}`,
            keepUnusedDataFor: 0,
        })
    }),
});

// Auto-generated hooks based on the endpoints
export const { useLazyGetCustomerInfoQuery, useLazyGetAllOrdersQuery, useGetAllProductsQuery, useConfirmOrderMutation, useGetCategoryProductsQuery, useLazyGetCategoryProductsQuery } = productApiSlice;
export default productApiSlice;