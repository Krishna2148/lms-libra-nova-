import { BACKEND_BASE_URL } from "../apiCallConstraints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./utils/TokenHandler";

export const baseUrl = BACKEND_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        if (!headers.has("content-type")) {
            headers.set("content-type", "application/json");
        } else {
            headers.delete("content-type");
        }
        const token = getToken("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers
    },
});
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: () => ({}),
})