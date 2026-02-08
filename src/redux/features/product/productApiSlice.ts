import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQuery';

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Post', 'OnlineOrders', 'myOrders', 'allOrders'],
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
        getMyOrders: builder.query({
            query: (q) => '/waiter/orders?' + q,
            providesTags: ['myOrders'],
        }),

        updateOrderItemStatus: builder.mutation({
            query: (data) => ({
                url: "/waiter/kitchen-item-status",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['myOrders', "allOrders"]
        }),

        getAllOrders: builder.query({
            query: (q) => '/waiter/all-orders?' + q,
            keepUnusedDataFor: 60,
            providesTags: ['allOrders'],
        }),


        // online orders
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
            invalidatesTags: ['OnlineOrders', "allOrders"]
        }),

        confirmOrder: builder.mutation({
            query: (data) => ({
                url: "/waiter/orders",
                method: "POST",
                body: data
            })
        }),

        getCustomerInfo: builder.query({
            query: (phone) => `/customers/${phone}`,
            keepUnusedDataFor: 0,
        }),

        // tables
        getTables: builder.query({
            query: () => `/waiter/tables`
        })
    }),
});

// Auto-generated hooks based on the endpoints
export const {
    useLazyGetCustomerInfoQuery,
    useLazyGetAllOrdersQuery,
    useGetAllProductsQuery,

    // orders
    useGetMyOrdersQuery,
    useUpdateOrderItemStatusMutation,
    useLazyGetMyOrdersQuery,
    useLazyGetAllProductsQuery,
    useGetAllOrdersQuery,

    // online orders
    useGetOnlineOrdersQuery,
    useLazyGetOnlineOrdersQuery,
    useUpdateOnlineOrdersMutation,


    useConfirmOrderMutation,
    useGetCategoryProductsQuery,
    useLazyGetCategoryProductsQuery,

    // table
    useLazyGetTablesQuery,

    usePrefetch: useProductPrefetch
} = productApiSlice;
export default productApiSlice;