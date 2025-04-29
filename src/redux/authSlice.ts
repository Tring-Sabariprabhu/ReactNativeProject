import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
    },
    reducers: {
        setAuth: (state, action)=> {
            state.token = action?.payload?.token;
        },
    },
});
export const {setAuth} = authSlice.actions;
export default authSlice.reducer;
