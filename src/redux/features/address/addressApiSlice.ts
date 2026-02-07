import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQuery';

export const addressApiSlice = createApi({
    reducerPath: 'addressApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({

        getAddresses: builder.query({
            query: () => "/addresses",
        }),
    }),
});

// Auto-generated hooks based on the endpoints
export const { useGetAddressesQuery } = addressApiSlice;
export default addressApiSlice;