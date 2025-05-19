
import { privateScreens } from 'src/Assets/Enums/screens';
import { AddDoctorScreen } from 'src/Components/Screens/AddDoctorScreen';
import { AppointmentsArrived } from 'src/Components/Screens/AppointmentsArrived';
import { BookAppointmentScreen } from 'src/Components/Screens/BookAppointmentScreen';
import { DoctorsScreen } from 'src/Components/Screens/DoctorsScreen';
import { PatientsScreen } from 'src/Components/Screens/PatientsScreen';
import { ViewAppointmentsScreen } from 'src/Components/Screens/ViewAppointmentsScreen';
import { UserRole } from 'src/MockDatabase/Enums/users';

export interface ScreenProps{
    name: privateScreens;
    component: React.ComponentType;
    iconName: string
    options?:{
        headerTitle: string;
        title: string;
    }
    iconFamily: 'MaterialIcons' | 'FontAwesome',
}

export const privateRoutes: Record<UserRole, ScreenProps[] > = {
    'admin': [
        {
            name: privateScreens?.Doctors,
            component: DoctorsScreen,
            iconName: 'stethoscope',
            iconFamily: 'FontAwesome',
        },
        {
            name: privateScreens?.AddDoctor,
            component: AddDoctorScreen,
            options: {
                headerTitle: 'Add Doctor',
                title: 'Add Doctor',
            },
            iconName: 'stethoscope',
            iconFamily: 'FontAwesome',
        },
        {
            name: privateScreens?.Patients,
            component: PatientsScreen,
            iconName: 'person',
            iconFamily: 'MaterialIcons',
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
            iconFamily: 'MaterialIcons',
        },
        {
            name: privateScreens?.ViewAppointments,
            component: ViewAppointmentsScreen,
            options: {
                headerTitle: 'View Appointments',
                title: 'View Appointments',
            },
            iconName: 'mail',
            iconFamily: 'MaterialIcons',
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
            iconFamily: 'MaterialIcons',
        },
    ],
};
