import { UserGender, UserRole } from '../Enums/users';
import { users } from '../MockData/users';
import { signup } from './auth';

interface addUserProps{
    email: string
    user_name: string
    user_age: number
    user_gender: UserGender
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
        const doctors = users?.filter((user)=> user?.user_role === UserRole?.DOCTOR);
        return doctors;
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err?.message);
        }
    }
};
export const addDoctor = ({email, user_age, user_name, user_gender}: addUserProps)=>{
    try{
        signup(
            {
                email,
                user_role: UserRole?.DOCTOR,
                user_name,
                user_age,
                user_gender,
                password: 'Test123@',
            });
        return 'Doctor added Successfully';
    }
    catch(err){
        if(err instanceof Error){
            throw new Error(err?.message);
        }
    }
};
