import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { ReactElement, useEffect, useState } from 'react';
import { fonts } from 'src/Assets/Fonts';
import { DoctorSpecialists } from 'src/MockDatabase/Enums/users';
import { Picker } from '@react-native-picker/picker';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { SigninFormStyles } from '../Authentication/SigninScreen';
import { colors } from 'src/Assets/Enums/colors';
import { styles } from 'src/Assets/Styles/global';
import { CustomList } from '../Custom/CustomList/CustomList';
import { Doctor, User } from 'src/MockDatabase/Types/Types';
import { getAllDoctors, getDoctorsWithSpecialists } from 'src/MockDatabase/MockAPIs/users';

export const BookAppointmentScreen = () => {
    const [specialization, setSpecialization] = useState<DoctorSpecialists | undefined>(undefined);
    const [doctors, setDoctors] = useState<User[] | undefined>();
    useEffect(() => {
        if (specialization) {
            const doctors = getDoctorsWithSpecialists({
                limit: 0,
                offset: 0,
                speciality: specialization,
            });
            console.log(doctors);
            setDoctors(doctors);
        }
    }, [specialization]);
    return (
        <View style={style?.screen}>
            <View style={style?.viewContainer}>
                {
                    specialization ?
                        <>
                            <Text style={style?.heading}>
                                Selected Specification
                            </Text>
                            <View style={style?.container}>
                                <Text style={style?.content}>
                                    {specialization}
                                </Text>
                                <CustomButton
                                    type={CustomButtonTypes.OPASITYBUTTON}
                                    title={'Remove'}
                                    buttonStyle={style?.button}
                                    textStyle={style?.buttonText}
                                    onPress={() => setSpecialization(undefined)} />
                            </View>
                        </> :
                        <>
                            <Text style={style?.heading}>
                                Select Specification..
                            </Text>
                            <Picker
                                style={SigninFormStyles?.dropDown}
                                selectedValue={specialization}
                                mode={'dropdown'}
                                onValueChange={(value) => {
                                    setSpecialization(value);
                                }}>
                                <Picker.Item
                                    value={null}
                                    label={'None'}
                                    style={SigninFormStyles?.dropDownItem} />
                                <Picker.Item
                                    value={DoctorSpecialists?.CARDIOLOGY}
                                    label={'Cardiology'}
                                    style={SigninFormStyles?.dropDownItem} />
                                <Picker.Item
                                    value={DoctorSpecialists?.DERMATOLOGY}
                                    label={'Dermatology'}
                                    style={SigninFormStyles?.dropDownItem} />
                            </Picker>
                        </>
                }
                <CustomList
                    listStyle={{ flex: 1 }}
                    listDirection={'row'}
                    listData={doctors}
                    renderItem={({ item: doctor, index }) => (
                        <View key={doctor?.doctor_id}>
                            <Text>{doctor?.user_name}</Text>
                        </View>
                    )} />

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
        borderWidth: 2,
        borderColor: colors?.GRAY,
        borderRadius: 10,
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
        textTransform: 'capitalize',
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
    },
    content: {
        fontSize: 18,
        fontFamily: fonts?.LIGHT,
        textTransform: 'capitalize',
    },
    button: {
        padding: 5,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: colors?.GRAY,
    },
    buttonText: {
        fontFamily: fonts?.REGULAR,
        fontSize: 14,
    },
});
