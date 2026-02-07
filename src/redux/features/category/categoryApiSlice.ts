import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQuery';

export const categoryApiSlice = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Post'], // Used for automatic invalidation (refetching)
    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => "/categories",
        }),

        getCategory: builder.query({
            query: (id) => `/categories/${id}`,
        }),

    }),
});

// Auto-generated hooks based on the endpoints
export const { useGetCategoriesQuery, useGetCategoryQuery } = categoryApiSlice;
export default categoryApiSlice;