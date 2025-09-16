import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
    user: {},
    userRoles: {
        name: "",
        permission: [],
    },
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{

    }
})