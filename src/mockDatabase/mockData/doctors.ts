import { DoctorSpecialists, Days } from '../Enums/doctors';
import { Doctor } from '../Types/Types';

export const doctors: Doctor[] = [
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.monday, Days?.tuesday, Days?.wednesday, Days?.thursday, Days?.friday, Days?.saturday],
        doctor_id: '6',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: [Days?.monday, Days?.tuesday, Days?.wednesday, Days?.thursday, Days?.friday],
        doctor_id: '7',
    },
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.monday, Days?.tuesday, Days?.wednesday, Days?.thursday, Days?.friday],
        doctor_id: '8',
    },
    {
        speciality: DoctorSpecialists?.DERMATOLOGY,
        work_days: [Days?.monday, Days?.tuesday, Days?.wednesday, Days?.thursday, Days?.friday],
        doctor_id: '9',
    },
    {
        speciality: DoctorSpecialists?.CARDIOLOGY,
        work_days: [Days?.monday, Days?.tuesday, Days?.wednesday, Days?.thursday, Days?.friday],
        doctor_id: '10',
    },

];
export { DoctorSpecialists };

