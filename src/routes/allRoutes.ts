import { screens } from 'src/Assets/Enums/screens';
import { SigninScreen } from 'src/Components/Authentication/SigninScreen';
import { SignupScreen } from 'src/Components/Authentication/SignupScreen';
import { AddDoctorScreen } from 'src/Components/Screens/AddDoctorScreen';
import { AppointmentsArrived } from 'src/Components/Screens/AppointmentsArrived';
import { UserDetails } from 'src/Components/Screens/UserDetails';
import { DoctorsStack } from 'src/Navigation/DoctorsStack';
import { HomeScreen } from 'src/Components/Screens/HomeScreen';
import { PatientsScreen } from 'src/Components/Screens/PatientsScreen';
import { ViewAppointmentsScreen } from 'src/Components/Screens/ViewAppointmentsScreen';
import { BookAppointmentStack } from 'src/Navigation/BookAppointmentStack';
import { DoctorsScreen } from 'src/Components/Screens/DoctorsScreen';
import { PatientsStack } from 'src/Navigation/PatientsStack';
import { BookAppointment } from 'src/Components/Screens/BookAppointment';

export const allRoutes = {
    [screens?.Signin]: {
        name: screens?.Signin,
        component: SigninScreen,
    },
    [screens?.Signup]: {
        name: screens?.Signup,
        component: SignupScreen,
    },
    [screens?.Home]: {
        name: screens?.Home,
        component: HomeScreen,
    },
    [screens?.DoctorsStack]: {
        name: screens?.DoctorsStack,
        component: DoctorsStack,
    },
    [screens?.Doctors]: {
        name: screens?.Doctors,
        component: DoctorsScreen,
    },
    [screens?.PatientsStack]: {
        name: screens?.PatientsStack,
        component: PatientsStack,
    },
    [screens?.Patients]: {
        name: screens?.Patients,
        component: PatientsScreen,
    },
    [screens?.AddDoctor]: {
        name: screens?.AddDoctor,
        component: AddDoctorScreen,
    },
    [screens?.BookAppointmentStack]: {
        name: screens?.BookAppointmentStack,
        component: BookAppointmentStack,
    },
      [screens?.BookAppointment]: {
        name: screens?.BookAppointment,
        component: BookAppointment,
    },
    [screens?.UserDetails]: {
        name: screens?.UserDetails,
        component: UserDetails,
    },
    [screens?.ViewAppointments]: {
        name: screens?.ViewAppointments,
        component: ViewAppointmentsScreen,
    },
    [screens?.AppointmentsArrived]: {
        name: screens?.AppointmentsArrived,
        component: AppointmentsArrived,
    },
};
