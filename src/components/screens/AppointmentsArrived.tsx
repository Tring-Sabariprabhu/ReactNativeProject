import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { colors } from 'src/Assets/Enums/colors';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'src/Redux/store';

export const AppointmentsArrived = () => {
    const user = useSelector((state: RootState) => state?.user);
    const NoResultsView = (
        <View style={style?.noResultsView}>
            <LottieView
                source={require('src/Assets/AnimationFiles/NoResults.json')}
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
        ...styles?.paragraph,
        color: colors?.DARK_BLUE,
    },
    patientImage: {
        width: 100,
        height: 100,
    },
});
