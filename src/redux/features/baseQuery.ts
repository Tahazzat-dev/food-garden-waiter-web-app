// import { getToken } from "@/utils/token";
import { getFromStorage, removeStorage } from "@/lib/storage";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
export const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = getFromStorage("auth_token");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        // Optional: Add more custom headers
        headers.set("Accept", "application/json");
        headers.set("X-App-Version", "1.0.0");

        return headers;
    },
})


export const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    const result = await baseQuery(args, api, extraOptions);
    // GLOBAL 401 HANDLER
    if (result.error && result.error.status === 401) {
        try {
            // call server to remove cookie
            await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            console.log("Logout request failed");
        }

        removeStorage('user');
        removeStorage('auth_token');
        api.dispatch({ type: "auth/resetAuthInfo" });

        // redirect
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }

    }

    return result;
};
