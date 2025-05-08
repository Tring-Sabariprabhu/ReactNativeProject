
import { privateScreens } from 'src/Assets/Enums/screens';
import { AddDoctorScreen } from 'src/Components/Screens/AddDoctorScreen';
import { BookAppointmentScreen } from 'src/Components/Screens/BookAppointmentScreen';
import { DoctorsScreen } from 'src/Components/Screens/DoctorsScreen';
import { HomeScreen } from 'src/Components/Screens/HomeScreen';
import { PatientsScreen } from 'src/Components/Screens/PatientsScreen';
import { ViewAppointmentsScreen } from 'src/Components/Screens/ViewAppointmentsScreen';
import { UserRole } from 'src/MockDatabase/Enums/users';


// export const privateRoutes= {
//     Home: {
//         name: privateScreens?.Home,
//         component: HomeScreen,
//         options: {
//             headerTitle: 'Dashboard',
//             title: 'Dashboard',
//         },
//         iconName: 'home',
//     },
//     BookAppointment: {
//         name: privateScreens?.BookAppointment,
//         component: BookAppointmentScreen,
//         options: {
//             headerTitle: 'Book Appointment',
//             title: 'Book Appointment',
//         },
//         iconName: 'add',
//     },
//     Doctors: {
//         name: privateScreens?.Doctors,
//         component: DoctorsScreen,
//         iconName: 'groups',
//     },
//     Patients: {
//         name: privateScreens?.Patients,
//         component: PatientsScreen,
//         iconName: 'groups',
//     },
//     AddDoctor: {
//         name: privateScreens?.AddDoctor,
//         component: AddDoctorScreen,
//         options: {
//             headerTitle: 'Add Doctor',
//             title: 'Add Doctor',
//         },
//         iconName: 'person-add',
//     },
// };

export const privateRoutes = [
    {
        name: privateScreens?.Home,
        component: HomeScreen,
        roles: [UserRole?.DOCTOR, UserRole?.ADMIN, UserRole?.PATIENT],
        options: {
            headerTitle: 'Dashboard',
            title: 'Dashboard',
        },
        iconName: 'home',
    },
    {
        name: privateScreens?.BookAppointment,
        component: BookAppointmentScreen,
        roles: [UserRole?.PATIENT],
        options:{
            headerTitle: 'Book Appointment',
            title: 'Book Appointment',
        },
        iconName: 'add',
    },
    {
        name: privateScreens?.ViewAppointments,
        component: ViewAppointmentsScreen,
        roles: [UserRole?.DOCTOR, UserRole?.PATIENT],
        options:{
            headerTitle: 'View Appointments',
            title: 'View Appointments',
        },
        iconName: 'mail',
    },
    {
        name: privateScreens?.Doctors,
        component: DoctorsScreen,
        roles: [UserRole?.ADMIN],
        iconName: 'groups',
    },
    {
        name: privateScreens?.Patients,
        component: PatientsScreen,
        roles: [UserRole?.ADMIN],
        iconName: 'groups',
    },
    {
        name: privateScreens?.AddDoctor,
        component: AddDoctorScreen,
        roles: [UserRole?.ADMIN],
        options: {
            headerTitle: 'Add Doctor',
            title: 'Add Doctor',
        },
        iconName: 'person-add',
    },
];
