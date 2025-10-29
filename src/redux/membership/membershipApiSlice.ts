// @ts-nocheck
import { apiSlice } from "@/app/components/apiSlice";
import { getToken } from "@/app/components/utils/TokenHandler";

export const membershipApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMembership: builder.query({
            query: ({ page, size, search }) => ({
                url: `membership?page=${page}&size=${size}&query=${search}`,
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken("token")}`,
                },
            }),
            providesTags: ["Membership"],
        }),

        addMembership: builder.mutation({
            query: ({ body,id }) => {
                return {
                    url: `membership/create/${id}`,
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken("token")}`,
                    },
                };
            },
            invalidatesTags: ['Membership'],
        }),
        getSingleMembership: builder.query({
            query: (id) => {
                return {
                    url: `membership/${id}`,
                    headers: {
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken()}`,
                    },
                };
            },
        }),
        // updateReservation: builder.mutation({
        //     query: ({ body, id }) => ({
        //         url: `reservation/update/${id}`,
        //         method: "PUT",
        //         body,
        //         headers: {
        //             "Content-Type": "application/json",
        //             Accept: "*/*",
        //             Authorization: `Bearer ${getToken()}`,
        //         },
        //     }),
        //     invalidatesTags: ["Membership"],
        // }),
        deleteMembership: builder.mutation({
            query: (id) => ({
                url: `membership/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Membership"],
        }),
    }),
    overrideExisting: true,
});
export const {
    useGetAllMembershipQuery,
    useAddMembershipMutation,
    useGetSingleMembershipQuery,
    useDeleteMembershipMutation
   
} = membershipApiSlice;