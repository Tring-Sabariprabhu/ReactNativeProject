export enum publicScreens {
    Signin = 'Signin',
    Signup = 'Signup',
}
export enum privateScreens {
    Home = 'Home',
    Doctors = 'Doctors',
    Patients = 'Patients',
    BookAppointment = 'BookAppointment',
    ViewAppointments = 'ViewAppointments',
    AddDoctor = 'AddDoctor',
}

export const adminRoutes = [
    privateScreens?.Home,
    privateScreens?.AddDoctor,
    privateScreens?.Doctors,
    privateScreens?.Patients,
];
export const doctorRoutes = [
    privateScreens?.Home,
    privateScreens?.ViewAppointments,
];

