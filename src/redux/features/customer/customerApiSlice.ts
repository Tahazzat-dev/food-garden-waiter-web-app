import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQuery';

export const customerApiSlice = createApi({
    reducerPath: 'customerApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({

        addCustomer: builder.mutation({
            query: (data) => ({
                url: "/waiter/customers",
                method: "POST",
                body: data
            })
        }),

        getCustomers: builder.query({
            query: () => "/waiter/customers"
        }),
    }),
});

// Auto-generated hooks based on the endpoints
export const { useAddCustomerMutation, useLazyGetCustomersQuery } = customerApiSlice;
export default customerApiSlice;