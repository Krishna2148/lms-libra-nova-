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

        addBorrowBook: builder.mutation({
            query: (body) => {
                return {
                    url: `borrow/create`,
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken("token")}`,
                    },
                };
            },
            invalidatesTags: ['BorrowBooks'],
        }),
        getSingleBorrowBook: builder.query({
            query: (id) => {
                return {
                    url: `borrow/${id}`,
                    headers: {
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken()}`,
                    },
                };
            },
        }),
        updateBorrowBook: builder.mutation({
            query: ({ body, id }) => ({
                url: `borrow/update/${id}`,
                method: "PUT",
                body,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken()}`,
                },
            }),
            invalidatesTags: ["BorrowBooks"], 
        }),
        returnBorrowBook: builder.mutation({
            query: (id) => ({
                url: `borrow/return/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken()}`,
                },
            }),
            invalidatesTags: ["BorrowBooks"],
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    borrowApiSlice.util.updateQueryData('getAllBorrowBooks', undefined, (draft) => {
                        const book = draft.find(book => book.id === id);
                        if (book) {
                            book.returned = true;
                            book.returnDate = new Date().toISOString();
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
    overrideExisting: true,
});
export const {
    useGetAllBorrowBooksQuery,
    useAddBorrowBookMutation,
    useGetSingleBorrowBookQuery,
    useUpdateBorrowBookMutation,
    useReturnBorrowBookMutation
} = borrowApiSlice;