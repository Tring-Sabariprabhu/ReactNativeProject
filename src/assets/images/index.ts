import maleDoctorImage from 'src/Assets/Images/male-doctor.png';
import femaleDoctorImage from 'src/Assets/Images/female-doctor.png';
import malePatientImage from 'src/Assets/Images/male-patient.png';
import femalePatientImage from 'src/Assets/Images/female-patient.png';
import adminImage from 'src/Assets/Images/administrator.png';
import { UserGender, UserRole } from 'src/MockDatabase/Enums/users';
import { ImageSourcePropType } from 'react-native';

export {
    maleDoctorImage,
    femaleDoctorImage,
    malePatientImage,
    femalePatientImage,
    adminImage,
};

export const getUserImage = (role: UserRole, gender: UserGender): ImageSourcePropType | undefined => {
        if (role === UserRole?.ADMIN) {
            return adminImage;
        } else if (role === UserRole?.DOCTOR) {
            return (gender === UserGender?.MALE ? maleDoctorImage : femaleDoctorImage);
        } else if (role === UserRole?.PATIENT) {
            return (gender === UserGender?.MALE ? malePatientImage : femalePatientImage);
        }
    };
