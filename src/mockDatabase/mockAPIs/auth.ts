import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../mockData/users';

interface signinProps {
    email: string,
    password: string
}
interface signupProps {
    email: string,
    name: string,
    password: string,
    age: number
}
export const signin = ({ email, password }: signinProps) => {
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
};
export const signup = ({ email, name, password, age }: signupProps) => {
    const userExists = users?.find((data) => data?.email === email);
    if (userExists) {
        throw new Error('User already exists');
    }
    users.push({
        user_id: (users?.length + 1).toString(),
        user_name: name,
        email,
        password: password,
        age: age,
    });
    return 'Registered Successfully';
};

export const getCurrentUser = async () => {
    try {
        const user_id = await AsyncStorage.getItem('token');
        const user = users?.find((data) => data?.user_id === user_id);
        return user;
    }
    catch (err) {
        if(err instanceof Error){
            throw new Error(err?.message);
        }
    }
};
