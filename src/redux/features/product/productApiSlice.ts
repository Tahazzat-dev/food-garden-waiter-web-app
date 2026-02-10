import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQuery';

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Post', 'OnlineOrders', 'kitchenMyOrders', 'myOrders', 'allOrders', 'countOnlineOrders'],
    endpoints: (builder) => ({
        // GET query for fetching data
        getCategoryProducts: builder.query({
            query: (id) => `/products?category_id=${id}`,
            providesTags: ['Post'],
        }),

        getAllProducts: builder.query({
            query: () => `/products`
        }
        ),

        // orders
        updateOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/waiter/orders/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['myOrders', "allOrders", 'kitchenMyOrders', "OnlineOrders"]
        }),

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
            invalidatesTags: ['myOrders', "allOrders", 'kitchenMyOrders']
        }),

        getAllOrders: builder.query({
            query: (q) => '/waiter/all-orders?' + q,
            keepUnusedDataFor: 60,
            providesTags: ['allOrders'],
        }),

        getkitchenMyOrders: builder.query({
            query: (q) => '/waiter/kitchen-my-orders?' + q,
            keepUnusedDataFor: 60,
            providesTags: ['kitchenMyOrders'],
        }),


        // online orders
        getOnlineOrders: builder.query({
            query: (q) => '/waiter/online-orders?' + q,
            keepUnusedDataFor: 60,
            providesTags: ['OnlineOrders'],
        }),
        countOnlineOrders: builder.query({
            query: () => '/waiter/online-orders-count',
            keepUnusedDataFor: 60,
            providesTags: ['countOnlineOrders'],
        }),

        updateOnlineOrders: builder.mutation({
            query: (data) => ({
                url: '/waiter/online-order-status',
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['OnlineOrders', "allOrders", 'kitchenMyOrders', "countOnlineOrders"]
        }),

        confirmOrder: builder.mutation({
            query: (data) => ({
                url: "/waiter/orders",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['myOrders', 'allOrders', 'kitchenMyOrders']
        }),

        sellOrder: builder.mutation({
            query: (data) => ({
                url: "/waiter/sale-order",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['myOrders', 'allOrders', 'kitchenMyOrders']
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
    useUpdateOrderMutation,
    useGetMyOrdersQuery,
    useUpdateOrderItemStatusMutation,
    useLazyGetMyOrdersQuery,
    useLazyGetAllProductsQuery,
    useGetAllOrdersQuery,
    useGetkitchenMyOrdersQuery,
    useSellOrderMutation,

    // online orders
    useGetOnlineOrdersQuery,
    useCountOnlineOrdersQuery,
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