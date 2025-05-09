import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { fonts } from 'src/Assets/Fonts';
import { styles } from 'src/Assets/Styles/global';
import { getAllPatients } from 'src/MockDatabase/MockAPIs/users';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { colors } from 'src/Assets/Enums/colors';
import { Patient, ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';

export const PatientsScreen = () => {
    const [patients, setPatients] = useState(getAllPatients());
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient>();
    const leftActions = () => {
        return (
            <View style={[ style?.person, style?.swipeActions]}>
                <Text style={style?.swipableText}>Delete</Text>
            </View>
        );
    };
    const rightActions = () => {
        return (
            <View style={[ style?.person, style?.swipeActions]}>
                <Text style={style?.swipableText}>View</Text>
            </View>
        );
    };
    return (
        <View style={style?.screen}>
            {
                <CustomList
                    listDirection={'column'}
                    listData={patients}
                    listStyle={style?.listContainer}
                    paginatorProps={{
                        numberOfPages: 1,
                        direction: 'center',
                        containerSize: 3,
                        whenPageMoved(page) {
                            setPatients(getAllPatients());
                        },
                    }}
                    renderItem={({ item: patient }) => (
                        <Swipeable
                            key={patient?.user_id}
                            renderLeftActions={leftActions}
                            renderRightActions={rightActions}
                            onSwipeableOpen={(action)=> console.log(action)}>
                            <View style={style?.person}>
                                <Text style={styles?.paragraph}>Patient name </Text>
                                <Text style={style?.person_name}>{patient?.user_name}</Text>
                            </View>
                        </Swipeable>
                    )} />
            }
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Patient details'}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                closeButtonText={'Ok'}
                childComponent={ViewUser(selectedPatient)}
                buttonStyle={style?.popupButton}
                buttonTextStyle={style?.popupButtonText}
            />
        </View>
    );
};

export const style = StyleSheet.create({
    swipeActions: {
        backgroundColor: colors?.BLUE,
        width: "100%",
    },
    swipableText: {
        ...styles?.paragraph,
        ...styles?.highlightedParagraph,
        color: colors?.WHITE,
    },
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
        gap: 20,
    },
    listContainer: {
        padding: 20,
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
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors?.LIGHT_GRAY,
        backgroundColor: colors?.WHITE,
    },
    person_name: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontFamily: fonts?.MEDIUM,
    },
    popupButton: {
        padding: 2,
    },
    popupButtonText: {
        fontSize: 22,
    },
});
