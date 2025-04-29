import { createSlice } from '@reduxjs/toolkit';
export interface userState{
    token: string | null,
    user_id: string | null,
    user_name: string | null,
    email: string | null,
    age: string | null,
}

const initialState: userState = {
    token: null,
    user_id: null,
    user_name: null,
    email: null,
    age: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action)=> {
            state.token = action?.payload?.token;
            state.user_id = action?.payload?.user_id;
            state.user_name = action?.payload?.user_name;
            state.age = action?.payload?.age;
            state.email = action?.payload?.email;
        },
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
