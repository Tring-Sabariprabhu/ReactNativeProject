import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from 'src/MockDatabase/Types/Types';

type RootStackParamList = {
    Signin: undefined;
    Signup: undefined;
    Home: undefined;
    AddDoctor: undefined;
    DoctorsStack: undefined
    PatientsStack: undefined
    BookAppointment: undefined
    SelectDoctor: undefined
    UserDetails: {
        user: User
    }
};
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
