import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { CustomSwipeableCardList } from '../Custom/CustomSwipeableCardList/CustomSwipeableCardList';
import { colors } from 'src/Assets/Enums/colors';
import LottieView from 'lottie-react-native';
import { getAppointmentsForDoctor } from 'src/MockDatabase/MockAPIs/appointment';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';
import { getUserImage } from 'src/Assets/Images';
import { UserRole } from 'src/MockDatabase/Enums/users';
import { fonts } from 'src/Assets/Fonts';
import { fontSizes } from 'src/Assets/Styles/fontSizes';

export const AppointmentsArrived = () => {
    const user = useSelector((state: RootState) => state?.user);
    const [appointments, setAppointments] = useState<any[]>();
    useEffect(() => {
        if (user?.user_id) {
            const records = getAppointmentsForDoctor({
                doctor_id: user?.user_id,
            });
            console.log(records);
            setAppointments(records);
        }
    }, [user]);
    const NoResultsView = (
        <View style={style?.noResultsView}>
            <LottieView
                source={require('src/Assets/AnimationFiles/noResultsFound.json')}
                style={style?.animatiedImage} autoPlay />
            <Text style={style?.noResultsContent}>
                No Appointments found
            </Text>
        </View>
    );
    return (
        <View style={style?.screen}>
           {NoResultsView}
        </View>
    );
};



const style = StyleSheet.create({
    screen: {
        flex: 1,
    },
    cardView: {
        gap: 20,
        flex: 1,
        borderRadius: 15,
        backgroundColor: colors?.WHITE,
        padding: 20,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentView: {
        paddingHorizontal: 20,
    },
    contentRow: {
        flexDirection: 'row',
    },
    noResultsView: {
        backgroundColor: colors?.WHITE,
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatiedImage: {
        width: 180,
        height: 180,
    },
    noResultsContent: {
        fontFamily: fonts?.REGULAR,
        color: colors?.DARK_BLUE,
        fontSize: fontSizes?.heading,
    },
    patientImage: {
        width: 100,
        height: 100,
    },
});
