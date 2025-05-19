import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { fonts } from 'src/Assets/Fonts';
import { DoctorSpecialists } from 'src/MockDatabase/Enums/users';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { styles } from 'src/Assets/Styles/global';
import { User } from 'src/MockDatabase/Types/Types';
import { getDoctorsWithSpecialists } from 'src/MockDatabase/MockAPIs/users';
import { SelectInput } from '../Custom/SelectInput';
import { DoctorsScreen } from './DoctorsScreen';

export const BookAppointmentScreen = () => {
    const [specialization, setSpecialization] = useState<DoctorSpecialists | null>(null);
    const [doctors, setDoctors] = useState<User[] | undefined>();
    // useEffect(() => {
    //     if (specialization) {
    //         const doctors = getDoctorsWithSpecialists({
    //             limit: 0,
    //             offset: 0,
    //             speciality: specialization,
    //         });
    //         console.log(doctors);
    //         setDoctors(doctors);
    //     }
    // }, [specialization]);
    const handleChange = (value: string)=>{
        if(value){
            setSpecialization(value as DoctorSpecialists);
        }
    };
    return (
        <View style={style?.screen}>
            <View style={style?.viewContainer}>
             <DoctorsScreen/>
                {/* <CustomList
                    listStyle={{ flex: 1 }}
                    listDirection={'row'}
                    renderItem={({ item: doctor, index }) => (
                        <View key={doctor?.doctor_id}>
                            <Text>{doctor?.user_name}</Text>
                        </View>
                    )} /> */}
            </View>
        </View>
    );
};


const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
        padding: 15,
    },
    viewContainer: {
        flex: 1,
        gap: 10,
        padding: 15,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    heading: {
        color: PRIMARY_COLOR,
        textTransform: 'capitalize',
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
    },
    content: {
        fontSize: 15,
        fontFamily: fonts?.LIGHT,
        textTransform: 'capitalize',
    },
    dropDown: {
        ...styles?.dropDown,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    button: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    buttonText: {
        fontFamily: fonts?.REGULAR,
        fontSize: 13,
        textDecorationLine: 'underline',
    },
});
