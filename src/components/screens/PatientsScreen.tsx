import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import { fonts } from 'src/Assets/Fonts';
import { styles } from 'src/Assets/Styles/global';
import { getAllPatients } from 'src/MockDatabase/MockAPIs/users';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { colors } from 'src/Assets/Enums/colors';
import { Patient, ViewUser } from '../Custom/ViewUser';

export const PatientsScreen = () => {
    const patients = getAllPatients();
    const [patientDetailsPopup, setPatientDetailsPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient>();
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
                            <View  key={patient?.user_id}>
                                <View style={style?.person}>
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
                titleStyle={{fontSize: 25}}
                isOpen={patientDetailsPopup}
                onClose={() => setPatientDetailsPopup(false)}
                closeButtonText={'Ok'}
                childComponent={ViewUser(selectedPatient)}
                />
        </View>
    );
};

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
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderWidth: 2,
        borderColor: colors?.LIGHT_GRAY,
        backgroundColor: colors?.WHITE,
    },
    person_name: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontFamily: fonts?.MEDIUM,
    },
});
