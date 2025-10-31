// @ts-nocheck
import { apiSlice } from "@/app/components/apiSlice";
import { getToken } from "@/app/components/utils/TokenHandler";

export const reservationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllReservation: builder.query({
            query: ({ page=1, size=10, search="" }) => ({
                url: `reservation?page=${page}&size=${size}&query=${search}`,
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken("token")}`,
                },
            }),
            providesTags: ["Reservations"],
        }),

        addReservation: builder.mutation({
            query: ({ body, bookId, memberId }) => {
                return {
                    url: `reservation/book/${bookId}/member/${memberId}`,
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken("token")}`,
                    },
                };
            },
            invalidatesTags: ['Reservations'],
        }),
        getSingleReservation: builder.query({
            query: (id) => {
                return {
                    url: `reservation/${id}`,
                    headers: {
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken()}`,
                    },
                };
            },
        }),
        updateReservation: builder.mutation({
            query: ({ body, id }) => ({
                url: `reservation/update/${id}`,
                method: "PUT",
                body,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken()}`,
                },
            }),
            invalidatesTags: ["Reservations"],
        }),
        deleteReservation: builder.mutation({
            query: (id) => ({
                url: `reservation/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Reservations"],
        }),
    }),
    overrideExisting: true,
});
export const {
    useGetAllReservationQuery,
    useAddReservationMutation,
    useGetSingleReservationQuery,
    useUpdateReservationMutation,
    useDeleteReservationMutation
} = reservationApiSlice;