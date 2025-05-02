
import { privateScreens } from 'src/assets/enums/screens';
import { BookAppointmentScreen } from 'src/components/screens/BookAppointmentScreen';
import { HomeScreen } from 'src/components/screens/HomeScreen';
import { ViewAppointmentsScreen } from 'src/components/screens/ViewAppointmentsScreen';

export const privateRoutes = [
    {
        name: privateScreens?.Home,
        component: HomeScreen,
    },
    {
        name: privateScreens?.BookAppointment,
        component: BookAppointmentScreen,
        options:{
            headerTitle: 'Book Appointment',
        },
    },
    {
        name: privateScreens?.ViewAppointments,
        component: ViewAppointmentsScreen,
    },
];
