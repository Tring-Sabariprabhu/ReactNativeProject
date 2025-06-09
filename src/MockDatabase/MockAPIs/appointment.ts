import { AppointmentStatus } from '../Enums/appointment';
import { appointments } from '../MockData/appointments';
import { users } from '../MockData/users';

interface GetAppointmentsForDoctor {
    doctor_id: string
}
export const getAppointmentsForDoctor = ({doctor_id}: GetAppointmentsForDoctor)=> {
    const fileredAppointments = appointments?.filter((appointment)=> (appointment?.doctor_id === doctor_id && appointment?.status === AppointmentStatus?.PENDING));
    return fileredAppointments.map((appointment)=> {
        let patient = users?.find((user)=> user?.user_id === appointment?.patient_id);
        return {
            ...appointment,
            patient_name: patient?.user_name,
            patient_age: patient?.user_age,
            patient_gender: patient?.user_gender,
        };
    });
};

