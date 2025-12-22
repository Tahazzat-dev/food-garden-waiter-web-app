// import { IUser, TManualDomain } from "@/types/types";
// import { createSlice } from "@reduxjs/toolkit";

// export interface TInitialState {
//   authUser: IUser | null;
//   isUserLoading: boolean;
// }

// //  initial state
// const initialState: TInitialState = {
//   authUser: null,
//   isUserLoading: true,
// };

// // ==========  Create the slice with reducers for individual property changes ============
// const AuthSlice = createSlice({
//   name: "auth-info",
//   initialState,
//   reducers: {
//     setAuthUser(state, action: { payload: IUser | null }) {
//       state.authUser = action.payload;
//     },
//     setUserDataLoading(state, action: { payload: boolean }) {
//       state.isUserLoading = action.payload;
//     },

//     setDefaultDomainStatus(
//       state,
//       action: { payload: { id: string; status: "enabled" | "disabled" } }
//     ) {
//       if (!state.authUser || !state.authUser.defaultDomains) return;
//       state.authUser = {
//         ...state.authUser,
//         defaultDomains: state.authUser.defaultDomains.map((d) =>
//           d._id === action.payload.id
//             ? { ...d, status: action.payload.status }
//             : d
//         ),
//       };
//     },

//      setManualDomainStatus(
//       state,
//       action: { payload: { id: string; status: "enabled" | "disabled" } }
//     ) {
//       if (!state.authUser || !state.authUser.manualDomains) return;
//       state.authUser = {
//         ...state.authUser,
//         manualDomains: state.authUser.manualDomains.map((d) =>
//           d._id === action.payload.id
//             ? { ...d, status: action.payload.status }
//             : d
//         ),
//       };
//     },

//     setManualDomain(state, action: { payload: TManualDomain }) {
//       if (!state.authUser) return;
//       state.authUser = {
//         ...state.authUser,
//         manualDomains: [
//           ...(state.authUser.manualDomains || []),
//           action.payload,
//         ],
//       };
//       state.authUser.manualCronCount++;
//     },

//     deleteManualDomain(state, action: { payload: string }) {
//       if (!state.authUser || !state.authUser?.manualDomains?.length) return;
//       state.authUser = {
//         ...state.authUser,
//         manualDomains: state.authUser.manualDomains.filter(
//           (d) => d._id !== action.payload
//         ),
//       };
//       state.authUser.manualCronCount--;
//     },
//     resetAuthInfo: () => initialState,
//   },
// });

// export const {
//   setAuthUser,
//   resetAuthInfo,
//   setUserDataLoading,
//   setManualDomainStatus,
//   setDefaultDomainStatus,
//   setManualDomain,
//   deleteManualDomain,

// } = AuthSlice.actions;

// export default AuthSlice.reducer;
