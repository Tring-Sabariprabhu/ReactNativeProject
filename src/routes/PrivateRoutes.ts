
import { ReactElement } from 'react';
import { privateScreens } from 'src/Assets/Enums/screens';
import { AddDoctorScreen } from 'src/Components/Screens/AddDoctorScreen';
import { AppointmentsArrived } from 'src/Components/Screens/AppointmentsArrived';
import { BookAppointmentScreen } from 'src/Components/Screens/BookAppointmentScreen';
import { DoctorsScreen } from 'src/Components/Screens/DoctorsScreen';
import { PatientsScreen } from 'src/Components/Screens/PatientsScreen';
import { ViewAppointmentsScreen } from 'src/Components/Screens/ViewAppointmentsScreen';
import { UserRole } from 'src/MockDatabase/Enums/users';

// export const privateRoutes = [
//     {
//         name: privateScreens?.Home,
//         component: HomeScreen,
//         roles: [UserRole?.DOCTOR, UserRole?.ADMIN, UserRole?.PATIENT],
//         options: {
//             headerTitle: 'Dashboard',
//             title: 'Dashboard',
//         },
//         iconName: 'home',
//     },
//     {
//         name: privateScreens?.AppointmentsArrived,
//         component: AppointmentsArrived,
//         roles: [UserRole?.DOCTOR],
//         options: {
//             headerTitle: 'Appointments Arrived',
//             title: 'Appointments Arrived',
//         },
//         iconName: 'mail',
//     },
//     {
//         name: privateScreens?.BookAppointment,
//         component: BookAppointmentScreen,
//         roles: [UserRole?.PATIENT],
//         options: {
//             headerTitle: 'Book Appointment',
//             title: 'Book Appointment',
//         },
//         iconName: 'add',
//     },
//     {
//         name: privateScreens?.ViewAppointments,
//         component: ViewAppointmentsScreen,
//         roles: [UserRole?.PATIENT],
//         options: {
//             headerTitle: 'View Appointments',
//             title: 'View Appointments',
//         },
//         iconName: 'mail',
//     },
// ];

export interface ScreenProps{
    name: privateScreens;
    component: React.ComponentType;
    iconName: string
    options?:{
        headerTitle: string;
        title: string;
    }
}

export const privateRoutes: Record<UserRole, ScreenProps[] > = {
    'admin': [
        {
            name: privateScreens?.Doctors,
            component: DoctorsScreen,
            iconName: 'groups',
        },
        {
            name: privateScreens?.Patients,
            component: PatientsScreen,
            iconName: 'groups',
        },
        {
            name: privateScreens?.AddDoctor,
            component: AddDoctorScreen,
            options: {
                headerTitle: 'Add Doctor',
                title: 'Add Doctor',
            },
            iconName: 'person-add',
        },
    ],
    'patient': [
        {
            name: privateScreens?.BookAppointment,
            component: BookAppointmentScreen,
            options: {
                headerTitle: 'Book Appointment',
                title: 'Book Appointment',
            },
            iconName: 'add',
        },
        {
            name: privateScreens?.ViewAppointments,
            component: ViewAppointmentsScreen,
            options: {
                headerTitle: 'View Appointments',
                title: 'View Appointments',
            },
            iconName: 'mail',
        },
    ],
    'doctor': [
        {
            name: privateScreens?.AppointmentsArrived,
            component: AppointmentsArrived,
            options: {
                headerTitle: 'Appointments Arrived',
                title: 'Appointments Arrived',
            },
            iconName: 'mail',
        },
    ],
};
