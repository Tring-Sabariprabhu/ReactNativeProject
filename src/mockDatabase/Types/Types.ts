import { UserRole, UserGender, DoctorSpecialists, Days, Slots } from '../Enums/users';

export interface User extends Doctor {
    user_id: string
    user_name: string
    user_role: UserRole
    user_age: number
    user_gender: UserGender
    email: string
    password: string
}

export interface Doctor{
    speciality?: DoctorSpecialists,
    work_days?: Days[]
    doctor_id?: string
}
export interface SlotTimings {
    day?: Days,
    slot?: Slots,
    status?: 'Available' | 'Notavailable',
    doctor_id?: string
}

