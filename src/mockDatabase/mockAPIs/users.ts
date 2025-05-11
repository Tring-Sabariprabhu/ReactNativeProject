import { UserGender, UserRole } from '../Enums/users';
import { doctors, DoctorSpecialists } from '../MockData/doctors';
import { users } from '../MockData/users';
import { Work_days } from '../Types/Types';

interface getDoctorProps {
    doctor_id: string
}
interface addUserProps {
    email: string
    doctor_name: string
    doctor_age: number
    doctor_gender: UserGender
    speciality: DoctorSpecialists,
    work_days: Work_days,
}
interface getAllUsersProps {
    limit: number,
    offset: number
}
export const getAllPatients = ({limit, offset}: getAllUsersProps) => {
    try {
        console.log(`limit: ${limit} , offset: ${offset}`);
        const patients = users?.filter((user) => user?.user_role === UserRole?.PATIENT);
        if(offset === 0){
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
export const getPatientsCount = ()=>{
    const patients = users?.filter((user)=> user?.user_role === UserRole?.PATIENT);
    return patients?.length;
};
export const getDoctorsCount = ()=>{
    const patients = users?.filter((user)=> user?.user_role === UserRole?.DOCTOR);
    return patients?.length;
};
export const getAllDoctors = ({limit, offset}: getAllUsersProps) => {
    try {
        let allDoctors = users?.filter((user) => user?.user_role === UserRole?.DOCTOR);
        if(offset === 0){
            allDoctors = allDoctors?.slice(0, limit);
        }else{
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
    work_days,
    speciality }: addUserProps) => {
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
        return 'Doctor added Successfully';
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(err?.message);
        }
    }
};
