import { UserGender, UserRole } from '../Enums/users';
import { User } from '../Types/Types';


export const users: User[] = [
    {
        user_id: '1',
        user_name: 'Admin',
        user_role: UserRole?.ADMIN,
        user_age: 22,
        user_gender: UserGender?.MALE,
        email: 'admin@mailinator.com',
        password: 'Test123@',
    },
    {
        user_id: '2',
        user_name: 'kumar',
        user_role: UserRole?.PATIENT,
        user_age: 23,
        user_gender: UserGender?.MALE,
        email: 'kumar@mailinator.com',
        password: 'Test123@',
    },
    {
        user_id: '3',
        user_name: 'manoj',
        user_role: UserRole?.PATIENT,
        user_age: 22,
        user_gender: UserGender?.MALE,
        email: 'manoj@mailinator.com',
        password: 'Test123@',
    },
    {
        user_id: '4',
        user_name: 'Priya',
        user_role: UserRole?.DOCTOR,
        user_age: 22,
        user_gender: UserGender?.FEMALE,
        email: 'priya@mailinator.com',
        password: 'Test123@',
    },
    {
        user_id: '5',
        user_name: 'Chandru',
        user_role: UserRole?.DOCTOR,
        user_age: 22,
        user_gender: UserGender?.MALE,
        email: 'chandru@mailinator.com',
        password: 'Test123@',
    },
    {
        user_id: '6',
        user_name: 'Kavya',
        user_role: UserRole?.DOCTOR,
        user_age: 22,
        user_gender: UserGender?.FEMALE,
        email: 'kavya@mailinator.com',
        password: 'Test123@',
    },
];
