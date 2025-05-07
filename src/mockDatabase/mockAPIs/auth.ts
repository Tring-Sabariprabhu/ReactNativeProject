import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../MockData/users';
import { UserGender, UserRole } from '../Enums/users';
import { doctors } from '../MockData/doctors';

interface signinProps {
    email: string,
    password: string
}
interface signupProps {
    user_name: string,
    user_age: number
    user_role?: UserRole
    user_gender: UserGender
    email: string,
    password: string,
}
export const signin = ({ email, password }: signinProps) => {
    try {
        const userdata = users.find((data) => data?.email === email);
        if (!userdata) {
            throw new Error('User not found');
        }
        if (userdata?.password !== password) {
            throw new Error('Password Incorrect');
        }
        return {
            user_id: userdata?.user_id,
        };
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
export const signup = ({ email, user_name, password, user_age, user_role = UserRole?.PATIENT, user_gender}: signupProps) => {
    try {
        const userExists = users?.find((data) => data?.email === email);
        if (userExists) {
            throw new Error('User already exists');
        }
        users.push({
            user_id: (users?.length + 1).toString(),
            user_name,
            user_role,
            user_gender,
            user_age,
            email,
            password,
        });
        return 'Registered Successfully';
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};

export const getCurrentUser = async () => {
    try {
        const user_id = await AsyncStorage.getItem('token');
        const user = users?.find((data) => data?.user_id === user_id);
        if(user?.user_role === UserRole?.DOCTOR){
            const doctorDetails = doctors?.find((doctor)=> doctor?.user_id === user?.user_id);
            return ({...user, doctorDetails});
        }
        return user;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
