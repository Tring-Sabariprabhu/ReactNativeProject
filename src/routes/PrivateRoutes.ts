
import { privateScreens } from 'src/Assets/Enums/screens';
import { AddDoctorScreen } from 'src/Components/Screens/AddDoctorScreen';
import { BookAppointmentScreen } from 'src/Components/Screens/BookAppointmentScreen';
import { DoctorsScreen } from 'src/Components/Screens/DoctorsScreen';
import { HomeScreen } from 'src/Components/Screens/HomeScreen';
import { PatientsScreen } from 'src/Components/Screens/PatientsScreen';
import { ViewAppointmentsScreen } from 'src/Components/Screens/ViewAppointmentsScreen';
import { UserRole } from 'src/MockDatabase/Enums/users';

export const privateRoutes = [
    {
        name: privateScreens?.Home,
        component: HomeScreen,
        roles: [UserRole?.DOCTOR, UserRole?.ADMIN, UserRole?.PATIENT],
        options: {
            headerTitle: 'Dashboard',
            title: 'Dashboard',
        },
    },
    {
        name: privateScreens?.BookAppointment,
        component: BookAppointmentScreen,
        roles: [UserRole?.PATIENT],
        options:{
            headerTitle: 'Book Appointment',
            title: 'Book Appointment',
        },
    },
    {
        name: privateScreens?.ViewAppointments,
        component: ViewAppointmentsScreen,
        roles: [UserRole?.DOCTOR, UserRole?.PATIENT],
        options:{
            headerTitle: 'View Appointments',
            title: 'View Appointments',
        },
    },
    {
        name: privateScreens?.Doctors,
        component: DoctorsScreen,
        roles: [UserRole?.ADMIN],
    },
    {
        name: privateScreens?.Patients,
        component: PatientsScreen,
        roles: [UserRole?.ADMIN],
    },
    {
        name: privateScreens?.AddDoctor,
        component: AddDoctorScreen,
        roles: [UserRole?.ADMIN],
        options: {
            headerTitle: 'Add Doctor',
            title: 'Add Doctor',
        },
    },
];
