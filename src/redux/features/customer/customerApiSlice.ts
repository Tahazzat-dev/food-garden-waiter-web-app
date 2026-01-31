import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const customerApiSlice = createApi({
    reducerPath: 'customerApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({

        addCustomer: builder.mutation({
            query: (data) => ({
                url: "/customers",
                method: "POST",
                body: data
            })
        }),
    }),
});

// Auto-generated hooks based on the endpoints
export const { useAddCustomerMutation } = customerApiSlice;
export default customerApiSlice;