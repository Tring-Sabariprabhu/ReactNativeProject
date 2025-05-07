import { Days, DoctorSpecialists } from '../Enums/users';
import { Doctor } from '../Types/Types';



export const doctors: Doctor[] = [
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.MONDAY, Days?.TUESDAY],
        user_id: '4',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: [Days?.MONDAY, Days?.TUESDAY],
        user_id: '5',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: [Days?.MONDAY, Days?.TUESDAY],
        user_id: '6',
    },
];
export { DoctorSpecialists };

