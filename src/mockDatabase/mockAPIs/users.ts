import { Days, UserGender, UserRole } from '../Enums/users';
import { doctors, DoctorSpecialists } from '../MockData/doctors';
import { slotTimings } from '../MockData/slotTimings';
import { users } from '../MockData/users';
import { SlotTimings, User } from '../Types/Types';

interface getDoctorProps {
    doctor_id: string
}
interface addUserProps {
    email: string
    doctor_name: string
    doctor_age: number
    doctor_gender: UserGender
    speciality: DoctorSpecialists,
    work_days?: Days[]
    slotTimings?: SlotTimings[]
}
interface getAllUsersProps {
    limit: number,
    offset: number
}
interface getDoctorsProps extends getAllUsersProps {
    speciality: DoctorSpecialists,
    search?: string,
}
export const getAllPatients = ({ limit, offset }: getAllUsersProps) => {
    try {
        // console.log(`limit: ${limit} , offset: ${offset}`);
        const patients = users?.filter((user) => user?.user_role === UserRole?.PATIENT);
        if (offset === 0) {
            return patients?.slice(0, limit);
        }
        return patients?.slice(offset, offset + limit);
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
export const getPatientsCount = () => {
    const patients = users?.filter((user) => user?.user_role === UserRole?.PATIENT);
    return patients?.length;
};
export const getDoctorsCount = () => {
    const doctorsDetails = users?.filter((user) => user?.user_role === UserRole?.DOCTOR);
    return doctorsDetails?.length;
};
export const getAllDoctors = ({ limit, offset }: getAllUsersProps) => {
    try {
        // console.log(`limit: ${limit} , offset: ${offset}`);
        let allDoctors = users?.filter((user) => user?.user_role === UserRole?.DOCTOR);
        if (offset === 0) {
            allDoctors = allDoctors?.slice(0, limit);
        } else {
            allDoctors = allDoctors?.slice(offset, offset + limit);
        }
        allDoctors = allDoctors?.map((user) => {
            const doctorDetails = doctors?.find((doctor) => doctor?.doctor_id === user?.user_id);
            const slots = slotTimings.filter((doctor) => doctor?.doctor_id === user?.user_id);
            return (
                {
                    ...user,
                    ...doctorDetails,
                    ...{ slotTimings: slots },
                }
            );
        });
        return allDoctors;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
// export const getDoctorsWithSpecialists = ({ limit, offset, search, speciality }: getDoctorsProps) => {
//     try {
//         let allDoctors = doctors?.filter((doctor) => doctor?.speciality === speciality);

//         console.log(allDoctors);
//         allDoctors = allDoctors.map((doctor) => {
//             let personalDetails = users?.filter((user) => user?.user_id === doctor?.doctor_id);
//             let slots = slotTimings?.filter((slot) => slot?.doctor_id === doctor?.doctor_id);
//             return {
//                 ...doctor,
//                 ...personalDetails,
//                 ...{ slotTimings: slots },
//             };
//         });
//         return allDoctors as User[];
//     }
//     catch (err) {
//         if (err instanceof Error) {
//             throw new Error(err?.message);
//         }
//     }
// };
export const getDoctor = (props: getDoctorProps) => {
    try {
        const { doctor_id } = props;
        const userExists = users?.find((user) => user?.user_id === doctor_id);
        const doctorExists = doctors?.find((doctor) => doctor?.doctor_id === doctor_id);
        if (!userExists || !doctorExists) {
            throw new Error('Doctor not found');
        }
        return { ...userExists, ...doctorExists };
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
export const addDoctor = ({
    email,
    doctor_age,
    doctor_name,
    doctor_gender,
    speciality,
    work_days,
    slotTimings: slots }: addUserProps) => {
    try {
        const userExists = users?.find((data) => data?.email === email);
        if (userExists) {
            throw new Error('User already exists');
        }
        const user_id = (users?.length + 1).toString();
        users.push({
            user_id,
            user_name: doctor_name,
            user_role: UserRole?.DOCTOR,
            user_gender: doctor_gender,
            user_age: doctor_age,
            email,
            password: 'Test123@',
        });
        doctors?.push({
            doctor_id: user_id,
            speciality,
            work_days,
        });
        if (slots) {
            slots.forEach(slot => {
                slotTimings.push({
                    ...slot,
                    doctor_id: user_id,
                });
            });
        }
        return 'Doctor added Successfully';
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
