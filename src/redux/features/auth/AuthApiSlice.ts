// import { createApi } from '@reduxjs/toolkit/query/react';
// import { baseQuery } from '../baseQuery';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery,
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     register: builder.mutation({
//       query: (userData) => ({
//         url: '/auth/register',
//         method: 'POST',
//         body: userData,
//       }),
//     }),
//     forgotPassword: builder.mutation({
//       query: (userData) => ({
//         url: '/auth/forgot-password',
//         method: 'POST',
//         body: userData,
//       }),
//     }),
//     resetPassword: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/reset-password',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     verfifyRegistrationOTP: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/verify-registration-otp',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//       verfifyLoginOTP: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/verify-otp',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     regenerateRegisterOtp: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/resend-otp',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: '/auth/logout',
//         method: 'POST',
//       }),
//     }),
//   }),
// });

// export const {useLogoutMutation, useVerfifyLoginOTPMutation, useLoginMutation, useVerfifyRegistrationOTPMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation,useRegenerateRegisterOtpMutation } = authApi;
