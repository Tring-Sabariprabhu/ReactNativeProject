import { Days, UserRole } from '../Enums/users';
import { doctors } from '../MockData/doctors';
import { users } from '../MockData/users';

interface getDoctorProps {
    doctor_id: string
}
interface addDoctorProps {
    email: string
    doctor_name: string
    doctor_age: number
    doctor_gender: string
    telphone: string
    speciality: string,
    work_days: Days[]
    inTime: Date
    outTime: Date
}
interface getAllUsersProps {
    limit: number;
    offset: number;
    search?: string | null;
}
interface getAllUsersCountProps {
    search: string | null
}
interface getDoctorsProps extends getAllUsersProps {
    speciality: string,
    search: string | null,
}
export const getAllPatients = ({ limit, offset, search }: getAllUsersProps) => {
    try {
        console.log('Search value -- > ' + search);
        let patients;
        if(search){
            const toSearch = search?.trim().toLowerCase();
            patients = users?.filter((user) => (user?.user_role === UserRole?.PATIENT && user?.user_name?.trim().toLowerCase().startsWith(toSearch)));
        }else{
            patients = users?.filter((user)=> user?.user_role === UserRole?.PATIENT);
        }
        if (offset === 0) {
            return patients?.slice(0, limit);
        }else{
            return patients?.slice(offset, offset + limit);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
export const getPatientsCount = ({ search }: getAllUsersCountProps) => {
    let patients = users?.filter((user) => user?.user_role === UserRole?.PATIENT);
    if (search) {
        const toSearch = search?.trim().toLowerCase();
        return (patients?.filter((patient) => patient?.user_name?.trim().toLowerCase().startsWith(toSearch))).length;
    }
    return patients?.length;
};
export const getDoctorsCount = ({ search }: getAllUsersCountProps) => {
    let doctorsDetails = users?.filter((user) => user?.user_role === UserRole?.DOCTOR);
    if (search) {
        const toSearch = search?.trim().toLowerCase();
        return (doctorsDetails.filter((doctor) => doctor?.user_name?.trim()?.toLowerCase().startsWith(toSearch))).length;
    }
    return doctorsDetails?.length;
};
export const getAllDoctors = ({ limit, offset, search }: getAllUsersProps) => {
    try {
        console.log('Search value -- > ' + search);
        let allDoctors = users?.filter((user) => user?.user_role === UserRole?.DOCTOR);
        if (search !== null) {
            const toSearch = search?.trim().toLowerCase();
            allDoctors = allDoctors.filter((doctor) => doctor?.user_name?.trim()?.toLowerCase().startsWith(toSearch));
        }
        if (offset === 0) {
            allDoctors = allDoctors?.slice(0, limit);
        } else {
            allDoctors = allDoctors?.slice(offset, offset + limit);
        }
        allDoctors = allDoctors?.map((user) => {
            const doctorDetails = doctors?.find((doctor) => doctor?.doctor_id === user?.user_id);
            return (
                {
                    ...user,
                    ...doctorDetails,
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
    telphone,
    speciality,
    work_days,
    inTime,
    outTime }: addDoctorProps) => {
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
            telphone,
        });
        doctors?.push({
            doctor_id: user_id,
            speciality,
            work_days,
            inTime,
            outTime,
        });
        return 'Doctor added Successfully';
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
