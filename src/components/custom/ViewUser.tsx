import { View, Text, StyleSheet } from 'react-native';
import { fonts } from 'src/Assets/Fonts';
import { styles } from 'src/Assets/Styles/global';
import { Days, DoctorSpecialists, UserGender } from 'src/MockDatabase/Enums/users';

interface User {
    user_name: string
    user_age: number
    user_gender: UserGender
    email: string
}
export interface Doctor extends User {
    speciality: DoctorSpecialists,
    work_days: Days[]
}

export interface Patient extends User { }

export const ViewUser = (user: Doctor | Patient | undefined) => {
    return (
        <View style={style?.viewContainer}>
            <View style={style?.contentContainer}>
                <Text style={style?.label}>Name : </Text>
                <Text style={style?.contentWithCapitalized}>
                    {user?.user_name}
                </Text>
            </View>
            <View style={style?.contentContainer}>
                <Text style={style?.label}>Email : </Text>
                <Text style={style?.content}>
                    {user?.email}
                </Text>
            </View>
            <View style={style?.contentContainer}>
                <Text style={style?.label}>Age : </Text>
                <Text style={style?.content}>
                    {user?.user_age}
                </Text>
            </View>
            <View style={style?.contentContainer}>
                <Text style={style?.label}>Gender : </Text>
                <Text style={style?.contentWithCapitalized}>
                    {user?.user_gender}
                </Text>
            </View>
            {
                user &&
                'speciality' in user &&
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Speciality : </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {user?.speciality}
                    </Text>
                </View>
            }
            {
                user &&
                'work_days' in user &&
                user?.work_days &&
                <View style={{ flexDirection: 'row' }}>
                    <Text style={style?.label}>Work days : </Text>
                        {
                            user?.work_days?.map((day, index) => (
                            <Text key={day} style={style?.content}>
                                {index > 0 && ', '}
                                {day?.slice(0, 2)}
                            </Text>
                                ))
                        }
                </View>
            }
        </View>
    );
};

const style = StyleSheet.create({
    viewContainer: {
        padding: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        ...styles?.capitalizedContent,
        fontFamily: fonts?.MEDIUM,
        fontSize: 18,
    },
    content: {
        ...styles?.paragraph,
        fontSize: 18,
    },
    contentWithCapitalized: {
        ...styles?.capitalizedContent,
        fontSize: 18,
    },
});
