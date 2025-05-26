import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
