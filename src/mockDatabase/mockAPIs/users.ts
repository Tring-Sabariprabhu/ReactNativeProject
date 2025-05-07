import { Days, UserGender, UserRole } from '../Enums/users';
import { doctors, DoctorSpecialists } from '../MockData/doctors';
import { users } from '../MockData/users';

interface addUserProps{
    email: string
    doctor_name: string
    doctor_age: number
    doctor_gender: UserGender
    speciality: DoctorSpecialists,
    work_days: Days[],
}
export const getAllPatients = ()=>{
    try{
        const patients = users?.filter((user)=>user?.user_role === UserRole?.PATIENT);
        return patients;
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err?.message);
        }
    }
};
export const getAllDoctors = ()=>{
    try{
        let allDoctors = users?.filter((user)=> user?.user_role === UserRole?.DOCTOR);
        allDoctors = allDoctors?.map((user)=> {
            const doctorDetails = doctors?.find((doctor)=> doctor?.user_id === user?.user_id);
            return (
                {
                    ...user,
                    ...doctorDetails,
                }
            );
        });
        return allDoctors;
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err?.message);
        }
    }
};
export const addDoctor = ( props : addUserProps)=>{
    try{
        const { email,
                doctor_age,
                doctor_name,
                doctor_gender,
                work_days,
                speciality} = props;
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
            user_id,
            speciality,
            work_days,
        });
        return 'Doctor added Successfully';
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err?.message);
        }
    }
};
