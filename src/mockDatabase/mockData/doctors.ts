import { DoctorSpecialists } from '../Enums/users';
import { Doctor } from '../Types/Types';



export const doctors: Doctor[] = [
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: {
            monday: true,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        doctor_id: '4',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: {
            monday: true,
            tuesday: true,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        doctor_id: '5',
    },

];
export { DoctorSpecialists };

