// @ts-nocheck
import { apiSlice } from "@/app/components/apiSlice";
import { getToken } from "@/app/components/utils/TokenHandler";

export const borrowApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBorrowBooks: builder.query({
            query: ({ page, size, search }) => ({
                url: `borrow?page=${page}&size=${size}&query=${search}`,
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken("token")}`,
                },
            }),
            providesTags: ["BorrowBooks"],
        }),

        // addBook: builder.mutation({
        //     query: (body) => {
        //         return {
        //             url: `book`,
        //             method: "POST",
        //             body,
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 Accept: "*/*",
        //                 Authorization: `Bearer ${getToken("token")}`,
        //             },
        //         };
        //     },
        //     invalidatesTags: ['Books'],
        // }),
        // getSingleBook: builder.query({
        //     query: (id) => {
        //         return {
        //             url: `book/${id}`,
        //             headers: {
        //                 Accept: "*/*",
        //                 Authorization: `Bearer ${getToken()}`,
        //             },
        //         };
        //     },
        // }),
        // updateBook: builder.mutation({
        //     query: ({ body, id }) => {
        //         return {
        //             url: `book/update/${id}`,
        //             method: "PUT",
        //             body,
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 Accept: "*/*",
        //                 Authorization: `Bearer ${getToken()}`,
        //             },
        //         };
        //     },
        // }),
        // deleteBook: builder.mutation({
        //     query: (id) => {
        //         return {
        //             url: `book/delete/${id}`,
        //             method: "DELETE",
        //         };
        //     },
        // }),
    }),
    overrideExisting: true,
});
export const {
    useGetAllBorrowBooksQuery,
} = borrowApiSlice;