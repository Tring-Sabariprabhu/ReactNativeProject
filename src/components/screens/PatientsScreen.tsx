import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import GestureRecognizer from 'react-native-swipe-gestures';

import { fonts } from 'src/Assets/Fonts';
import { styles } from 'src/Assets/Styles/global';
import { getAllPatients } from 'src/MockDatabase/MockAPIs/users';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { colors } from 'src/Assets/Enums/colors';
import { User } from 'src/MockDatabase/Types/Types';
export const PatientsScreen = () => {
    const patients = getAllPatients();
    const [patientDetailsPopup, setPatientDetailsPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<User>();
    return (
        <View style={style?.screen}>
            <FlatList
                data={patients}
                renderItem={({ item: patient }) => {
                    return (
                        <GestureRecognizer
                            key={patient?.user_id}
                            onSwipeLeft={() => {
                                setSelectedPatient(patient);
                                setPatientDetailsPopup(true);
                            }}>
                            <View style={style?.person} key={patient?.user_id}>
                                <View>
                                    <Text style={styles?.paragraph}>Patient name </Text>
                                    <Text style={style?.person_name}>{patient?.user_name}</Text>
                                </View>
                            </View>
                        </GestureRecognizer>
                    );
                }} />
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Patient details'}
                isOpen={patientDetailsPopup}
                onClose={() => setPatientDetailsPopup(false)}
                closeButtonText={'Ok'}
                childComponent={showPatientDetails(selectedPatient)}
                />
        </View>
    );
};

const showPatientDetails = (patient: User | undefined)=> (
    <View style={style?.showPatientContainer}>
        <View style={style?.row}>
            <Text style={styles?.paragraph}>Name : </Text>
            <Text style={style?.capitalizedContent}>
                {patient?.user_name}
            </Text>
        </View>
        <View style={style?.row}>
            <Text style={styles?.paragraph}>Age : </Text>
            <Text style={styles?.paragraph}>
                {patient?.user_age}
            </Text>
        </View>
        <View style={style?.row}>
            <Text style={styles?.paragraph}>Gender : </Text>
            <Text style={style?.capitalizedContent}>
                {patient?.user_gender}
            </Text>
        </View>
    </View>
);

export const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
        gap: 20,
    },
    heading: {
        fontSize: 22,
        fontFamily: fonts?.LIGHT,
    },
    showPatientContainer: {
        paddingLeft: 10,
        paddingRight: 60,
        gap: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    capitalizedContent: {
        ...styles?.paragraph,
        ...styles?.capitalizedContent,
    },
    person: {
        ...styles?.paragraph,
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderWidth: 2,
        borderColor: colors?.LIGHT_GRAY,
        backgroundColor: colors?.WHITE,
    },
    swiped: {
        ...styles?.paragraph,
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderWidth: 2,
        borderColor: colors?.GRAY,
        backgroundColor: colors?.WHITE,
        opacity: 0.1,
    },
    person_name: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontFamily: fonts?.MEDIUM,
    },
});
