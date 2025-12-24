// import { getToken } from "@/utils/token";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    // baseUrl: `http://localhost:5000/api`,
    baseUrl: `https://expresscronjob.com/api/`,
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