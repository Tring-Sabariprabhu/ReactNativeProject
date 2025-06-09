import { createSlice } from '@reduxjs/toolkit';
import { Days } from 'src/MockDatabase/Enums/doctors';
export interface bookingState{
   booking: boolean;
   doctor_id: string;
   doctor_name: string;
   doctor_speciality: string;
   doctor_in_time: Date | null;
   doctor_out_time: Date | null;
   doctor_work_days: Days[];
}

const initialState: bookingState = {
    booking: false,
    doctor_id: '',
    doctor_name: '',
    doctor_speciality: '',
    doctor_in_time: null,
    doctor_out_time: null,
    doctor_work_days: [],
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState: initialState,
    reducers: {
        setBooking: (state, action)=> {
            state.booking = action?.payload?.booking;
            state.doctor_id = action?.payload?.doctor_id;
            state.doctor_name = action?.payload?.doctor_name;
            state.doctor_speciality = action?.payload?.doctor_speciality;
            state.doctor_in_time = action?.payload?.doctor_in_time;
            state.doctor_out_time = action?.payload?.doctor_out_time;
            state.doctor_work_days = action?.payload?.doctor_work_days;
        },
    },
});
export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
