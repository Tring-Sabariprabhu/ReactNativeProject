import { View, Text } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { Days, DoctorSpecialists, UserGender } from 'src/MockDatabase/Enums/users';
import { style } from './PatientsScreen';

export interface Doctor {
    user_name: string
    user_age: number
    user_gender: UserGender
    email: string
    speciality: DoctorSpecialists,
    work_days: Days[]
}

export const DoctorView = (doctor: Doctor | undefined) => {
    return (
        <View style={style?.showPatientContainer}>
            <View style={style?.row}>
                <Text style={styles?.paragraph}>Email : </Text>
                <Text style={styles?.paragraph}>
                    {doctor?.email}
                </Text>
            </View>
            <View style={style?.row}>
                <Text style={styles?.paragraph}>Name : </Text>
                <Text style={style?.capitalizedContent}>
                    {doctor?.user_name}
                </Text>
            </View>
            <View style={style?.row}>
                <Text style={styles?.paragraph}>Age : </Text>
                <Text style={styles?.paragraph}>
                    {doctor?.user_age}
                </Text>
            </View>
            <View style={style?.row}>
                <Text style={styles?.paragraph}>Gender : </Text>
                <Text style={style?.capitalizedContent}>
                    {doctor?.user_gender}
                </Text>
            </View>
            <View style={style?.row}>
                <Text style={styles?.paragraph}>Speciality : </Text>
                <Text style={style?.capitalizedContent}>
                    {doctor?.speciality}
                </Text>
            </View>
            <View style={style?.row}>
                <Text style={styles?.paragraph}>Work days : </Text>
                {
                    doctor?.work_days?.map((day, index) => (
                        <Text style={style?.capitalizedContent} key={index}>
                            {day?.slice(0, 2)},
                        </Text>
                    ))
                }
            </View>
        </View>
    );
};
