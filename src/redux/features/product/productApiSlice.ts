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
            query: (category) => "/products",
        }),
    }),
});

// Auto-generated hooks based on the endpoints
export const { useGetAllProductsQuery, useGetCategoryProductsQuery } = productApiSlice;
export default productApiSlice;