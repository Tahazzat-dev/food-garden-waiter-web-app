// import { getToken } from "@/utils/token";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
console.log(baseUrl, ' : baseurl')

export const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
        //   const token = getToken("accessToken");
        //   if (token) {
        //     headers.set("Authorization", `Bearer ${token}`);
        //   }

        // Optional: Add more custom headers
        headers.set("Accept", "application/json");
        headers.set("X-App-Version", "1.0.0");

        return headers;
    },
})