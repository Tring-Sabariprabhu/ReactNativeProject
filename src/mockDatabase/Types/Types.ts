import { UserRole, UserGender, DoctorSpecialists, Days, Slots } from '../Enums/users';

export interface User extends Doctor {
    user_id: string
    user_name: string
    user_role: string
    user_age: number
    user_gender: string
    email: string
    password: string
    telphone: string
}

export interface Doctor{
    speciality?: string,
    work_days?: Days[]
    inTime?: Date
    outTime?: Date
    doctor_id?: string
}

