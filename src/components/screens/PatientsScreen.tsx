import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from 'src/Assets/Fonts';
import { styles } from 'src/Assets/Styles/global';
import { getAllPatients, getPatientsCount } from 'src/MockDatabase/MockAPIs/users';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { colors } from 'src/Assets/Enums/colors';
import { Patient, ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';
import { User } from 'src/MockDatabase/Types/Types';

export const PatientsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient>();
    const limit = 3;
    const [totalCount, setTotalCount] = useState(0);
    const [patients, setPatients] = useState<User[] | undefined>();

    const refetch = () => {
        setTotalCount(getPatientsCount());
    };

    useEffect(() => {
        navigation?.addListener('focus', refetch);
    }, [navigation]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View style={style?.screen}>
            {
                <CustomList
                    listDirection={'column'}
                    listData={patients}
                    listStyle={style?.listContainer}
                    paginatorProps={{
                        totalCount: totalCount,
                        dataPerPage: limit,
                        containerPostion: 'center',
                        containerSize: 2,
                        whenPageMoved(props) {
                            setPatients(getAllPatients({
                                limit: limit,
                                offset: props?.offset,
                            }));
                        },
                    }}
                    renderItem={({ item: patient }) => (
                        <View style={style?.person} key={patient?.user_id} onTouchStart={() => {
                            console.log(patient);
                            setSelectedPatient(patient);
                            setShowPopup(true);
                        }}>
                            <Text style={styles?.paragraph}>
                                Patient name
                            </Text>
                            <Text style={style?.person_name}>
                                {patient?.user_name}
                            </Text>
                        </View>
                    )} />
            }
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Patient details'}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                closeButtonText={'Ok'}
                childComponent={ViewUser(selectedPatient)}
                buttonStyle={styles?.popupButton}
                buttonTextStyle={styles?.popupButtonText} />
        </View>
    );
};

export const style = StyleSheet.create({
    swipeActions: {
        backgroundColor: colors?.BLUE,
        width: '100%',
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
        padding: 20,
    },
    listContainer: {
        // height: '20%',
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
});
