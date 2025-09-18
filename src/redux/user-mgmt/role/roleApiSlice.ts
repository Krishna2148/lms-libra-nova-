// @ts-nocheck
import { apiSlice } from "@/app/components/apiSlice";
import { getToken } from "@/app/components/utils/TokenHandler";

export const roleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoles: builder.query({
            query: ({ page = 1, size = 10, search = "" } = {}) => ({
                url: `role?page=${page}&size=${size}&query=${search}`,
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${getToken("token")}`,
                },
            }),
            providesTags: ["Roles"],
        }),

        deleteRole: builder.mutation({
            query: (id) => {
                return {
                    url: `role/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ['Roles'],
        }),
    }),
    overrideExisting: true,
});
export const {
    useGetAllRolesQuery,
    useAddRoleMutation,
    useDeleteRoleMutation
} = roleApiSlice;