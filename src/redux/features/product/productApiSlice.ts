import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQuery,
    tagTypes: ['Post', 'OnlineOrders'], // Used for automatic invalidation (refetching)
    endpoints: (builder) => ({
        // GET query for fetching data
        getCategoryProducts: builder.query({
            query: (id) => `/products?category_id=${id}`,
            providesTags: ['Post'],
        }),

        getAllProducts: builder.query({
            query: () => `/products`,
        }),

        // orders
        getOnlineOrders: builder.query({
            query: (q) => '/waiter/online-orders?' + q,
            keepUnusedDataFor: 60,
            providesTags: ['OnlineOrders'],
        }),

        updateOnlineOrders: builder.mutation({
            query: (data) => ({
                url: '/waiter/online-order-status',
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['OnlineOrders']
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
export const {
    useLazyGetCustomerInfoQuery,
    useLazyGetAllOrdersQuery,
    useGetAllProductsQuery,

    // online orders
    useGetOnlineOrdersQuery,
    useLazyGetOnlineOrdersQuery,
    useUpdateOnlineOrdersMutation,


    useConfirmOrderMutation,
    useGetCategoryProductsQuery,
    useLazyGetCategoryProductsQuery,

    usePrefetch: useProductPrefetch
} = productApiSlice;
export default productApiSlice;