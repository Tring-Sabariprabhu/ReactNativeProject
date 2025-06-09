import { createSlice } from '@reduxjs/toolkit';
import { UserGender, UserRole } from 'src/MockDatabase/Enums/users';
export interface userState{
    user_id: string | null,
    user_name: string | null,
    user_role: UserRole | null,
    user_age: string | null,
    user_gender: UserGender | null,
    email: string | null,
}

const initialState: userState = {
    user_id: null,
    user_name: null,
    user_role: null,
    user_age: null,
    user_gender: null,
    email: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action)=> {
            state.user_id = action?.payload?.user_id;
            state.user_name = action?.payload?.user_name;
            state.user_role = action?.payload?.user_role;
            state.user_age = action?.payload?.user_age;
            state.user_gender = action.payload.user_gender;
            state.email = action?.payload?.email;
        },
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
