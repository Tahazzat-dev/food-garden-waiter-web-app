import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";
import { userActionApi } from "../userAction/userActionApi";

export const adminActionApi = createApi({
  reducerPath: "adminActionApi",
  baseQuery,
  tagTypes: ["user_details", "profile", "mails", "users", "guests"],
  endpoints: (builder) => ({
    // packages
    getPackages: builder.query({
      query: () => ({
        url: "/admin/packages",
        method: "GET",
      }),
    }),

    updatePackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/packages/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    addPackage: builder.mutation({
      query: (data) => ({
        url: "/admin/packages",
        method: "POST",
        body: data,
      }),
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/admin/packages/${id}`,
        method: "DELETE",
      }),
    }),

    //====== cron log history ======
    getAdminCronHistory: builder.query({
      query: (query) => ({
        url: `/admin/cron-log?${query}`,
        method: "GET",
      }),
    }),

    deleteAdminCronHistory: builder.mutation({
      query: () => ({
        url: "/admin/cron-log",
        method: "DELETE",
      }),
    }),

    // dashboard information
    getDashboardInfo: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
    }),

    getAnalyticsHistory: builder.mutation({
      query: () => ({
        url: "/admin/analytics",
        method: "GET",
      }),
    }),

    // ===== users information =======
    getUsers: builder.query({
      query: (query) => ({
        url: `/admin/users?${query}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["user_details"],
    }),
    deleteSingleUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user_details"],
    }),

    removeUserPackage: builder.mutation({
      query: (data) => ({
        url: "/admin/users/removepackage",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["user_details"],
    }),

    assignUserPackage: builder.mutation({
      query: (data) => ({
        url: "/admin/users/assignPackage",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user_details"],
    }),

    // domain crud
    addAdminManualDomain: builder.mutation({
      query: (data) => ({
        url: "/admin/crons",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userActionApi.util.invalidateTags(["profile"]));
        } catch (error) {
          // Handle error if needed
          console.log(error);
        }
      },
      invalidatesTags: ["profile"],
    }),

    updateAdminManualDomain: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/crons/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteAdminManualDomain: builder.mutation({
      query: (id) => ({
        url: `/admin/crons/${id}`,
        method: "DELETE",
      }),
    }),

    // transaction history
    getAllTransactionHistory: builder.query({
      query: (query) => ({
        url: `/admin/transaction-history?${query}`,
        method: "GET",
      }),
    }),

    // mails
    getUserMails: builder.query({
      query: (query) => ({
        url: `/admin/mails?${query}`,
        method: "GET",
      }),
      providesTags: ["mails"],
    }),
    getUserMailDetails: builder.query({
      query: (id) => ({
        url: `/admin/mails/${id}`,
        method: "GET",
      }),
    }),
    deleteUserMails: builder.mutation({
      query: () => ({
        url: `/admin/mails`,
        method: "DELETE",
      }),
      invalidatesTags: ["mails"],
    }),

    sendMailToUser: builder.mutation({
      query: (data) => ({
        url: `/admin/send-mail`,
        method: "POST",
        body: data,
      }),
    }),
    sendMailToAllUser: builder.mutation({
      query: (data) => ({
        url: `/admin/send-bulk-mail`,
        method: "POST",
        body: data,
      }),
    }),

    // === guest users action =====
    getGuestUsers: builder.query({
      query: (query) => ({
        url: `/admin/guest-users?${query}`,
        method: "GET",
      }),
      providesTags: ["guests"],
    }),
    addGuestUser: builder.mutation({
      query: (data) => ({
        url: `/admin/guest-users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["guests"],
    }),
    deleteGuestUser: builder.mutation({
      query: (id) => ({
        url: `/admin/guest-users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["guests"],
    }),
    sendMessageToGuestUsers: builder.mutation({
      query: (data) => ({
        url: `/admin/guest-users/mail`,
        method: "POST",
        body: data,
      }),
    }),


    // ====== admin action ends =======
  }),
});

export const {
  // package
  useDeletePackageMutation,
  useAddPackageMutation,
  useLazyGetPackagesQuery,
  useGetPackagesQuery,
  useUpdatePackageMutation,

  // cron history
  useLazyGetAdminCronHistoryQuery,
  useDeleteAdminCronHistoryMutation,

  // dashboard query
  useGetDashboardInfoQuery,

  // user query
  useLazyGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useRemoveUserPackageMutation,
  useAssignUserPackageMutation,
  useDeleteSingleUserMutation,

  // guest user query
  useLazyGetGuestUsersQuery,
  useAddGuestUserMutation,
  useDeleteGuestUserMutation,
  useSendMessageToGuestUsersMutation,

  // domain crud
  useAddAdminManualDomainMutation,
  useUpdateAdminManualDomainMutation,
  useDeleteAdminManualDomainMutation,

  // transaction history
  useLazyGetAllTransactionHistoryQuery,

  // mails
  useLazyGetUserMailsQuery,
  useGetUserMailDetailsQuery,
  useDeleteUserMailsMutation,
  useSendMailToUserMutation,
  useSendMailToAllUserMutation,
} = adminActionApi;
