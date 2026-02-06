// import { getToken } from "@/utils/token";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
export const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token = (getState() as any).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        // Optional: Add more custom headers
        headers.set("Accept", "application/json");
        headers.set("X-App-Version", "1.0.0");

        return headers;
    },
})