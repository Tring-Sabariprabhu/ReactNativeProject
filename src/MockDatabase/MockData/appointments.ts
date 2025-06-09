import { AppointmentStatus } from '../Enums/appointment';
import { Appointment } from '../Types/Types';

export const appointments: Appointment[] = [
    {
        appointment_id: '1',
        patient_id: '2',
        disease: 'Skin',
        description: '',
        doctor_id: '7',
        status: AppointmentStatus?.PENDING,
    },
    {
        appointment_id: '2',
        patient_id: '3',
        disease: 'Skin',
        description: '',
        doctor_id: '7',
        status: AppointmentStatus?.PENDING,
    },
    {
        appointment_id: '3',
        patient_id: '4',
        disease: 'Hair',
        description: '',
        doctor_id: '7',
        status: AppointmentStatus?.PENDING,
    },
];
