import { UserRole, UserGender, DoctorSpecialists } from '../Enums/users';

export interface User extends Doctor {
    user_id: string
    user_name: string
    user_role: UserRole
    user_age: number
    user_gender: UserGender
    email: string
    password: string
}


export interface Doctor {
    speciality?: DoctorSpecialists,
    work_days?: Work_days
    doctor_id?: string
}
export interface Work_days{
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
}


