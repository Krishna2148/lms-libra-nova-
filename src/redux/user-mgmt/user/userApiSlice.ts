// @ts-nocheck
import { apiSlice } from "@/app/components/apiSlice";
import { getToken } from "@/app/components/utils/TokenHandler";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ page, size, search }) => ({
                url: `users?page=${page}&size=${size}&query=${search}`,
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken("token")}`,
                },
            }),
            providesTags: ["Users"],
        }),

        addUser: builder.mutation({
            query: (body) => {
                return {
                    url: `users/add-user`,
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken("token")}`,
                    },
                };
            },
            invalidatesTags: ['Users'],
        }),
        getSingleUser: builder.query({
            query: (id) => {
                return {
                    url: `users/${id}`,
                    headers: {
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken()}`,
                    },
                };
            },
        }),
        updateUser: builder.mutation({
            query: ({ body, id }) => {
                return {
                    url: `update/${id}`,
                    method: "PUT",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        Authorization: `Bearer ${getToken()}`,
                    },
                };
            },
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `users/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ['Users'],
        }),
    }),
    overrideExisting: true,
});
export const {
    useGetAllUsersQuery,
    useAddUserMutation,
    useGetSingleUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApiSlice;