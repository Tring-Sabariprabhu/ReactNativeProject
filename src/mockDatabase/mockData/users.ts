import { UserRole } from "../enums/User"

export interface User{
    user_id: string
    user_name: string
    user_role: UserRole
    email: string
    age: number
    password: string
}
export const users: User[] = [
    {
        user_id: '1',
        user_name: 'Varun',
        user_role: UserRole?.ADMIN,
        email: 'varun@mailinator.com',
        password: 'Test123@',
        age: 22,
    },
    {
        user_id: '2',
        user_name: 'Kumar',
        user_role: UserRole?.PATIENT,
        email: 'kumar@mailinator.com',
        password: 'Test123@',
        age: 23,
    },
];
