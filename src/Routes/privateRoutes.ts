
import { screens } from 'src/Assets/Enums/screens';
import { SelectDoctor } from 'src/Components/Screens/BookAppointmentStack/SelectDoctor';
import { ScreenProps } from 'src/Components/Types/screenProps';
import { UserRole } from 'src/MockDatabase/Enums/users';
import { allRoutes } from './allRoutes';

export const privateRoutes: Record<UserRole, ScreenProps[]> = {
    [UserRole.ADMIN]: [
        {
            ...allRoutes?.DoctorsStack,
            options: {
                headerTitle: 'Doctors',
                title: 'Doctors',
            },
            iconName: 'stethoscope',
            iconFamily: 'FontAwesome',
        },
        {
            ...allRoutes?.AddDoctor,
            options: {
                headerTitle: 'Add Doctor',
                title: 'Add Doctor',
            },
            iconName: 'stethoscope',
            iconFamily: 'FontAwesome',
        },
        {
            ...allRoutes?.PatientsStack,
            iconName: 'person',
            options: {
                headerTitle: 'Patients',
                title: 'Patients',
            },
            iconFamily: 'MaterialIcons',
        },
    ],
    [UserRole?.PATIENT]: [
        {
            ...allRoutes?.BookAppointmentStack,
            options: {
                headerTitle: 'Book Appointment',
                title: 'Book Appointment',
            },
            iconName: 'add-card',
            iconFamily: 'MaterialIcons',
        },
        {
            ...allRoutes?.ViewAppointments,
            options: {
                headerTitle: 'View Appointments',
                title: 'View Appointments',
            },
            iconName: 'mail',
            iconFamily: 'MaterialIcons',
        },
    ],
    [UserRole?.DOCTOR]: [
        {
            ...allRoutes?.AppointmentsArrived,
            options: {
                headerTitle: 'Appointments Arrived',
                title: 'Appointments Arrived',
            },
            iconName: 'mail',
            iconFamily: 'MaterialIcons',
        },
    ],
};

