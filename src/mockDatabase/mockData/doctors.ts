import { Days, DoctorSpecialists } from '../Enums/users';
import { Doctor } from '../Types/Types';

export const doctors: Doctor[] = [
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.monday],
        doctor_id: '6',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: [Days?.monday],
        doctor_id: '7',
    },
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.monday],
        doctor_id: '8',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: [Days?.monday],
        doctor_id: '9',
    },
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.monday],
        doctor_id: '10',
    },

];
export { DoctorSpecialists };

