import { useEffect, useState } from 'react';
import { styles } from 'src/Assets/Styles/global';
import { getAllPatients, getPatientsCount } from 'src/MockDatabase/MockAPIs/users';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { Patient, ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';
import { User } from 'src/MockDatabase/Types/Types';
import { style } from 'src/Assets/Styles/list';
import { Text, View } from 'react-native';

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
                        <View style={style?.listItem}
                            key={patient?.user_id}>
                            <Text style={style?.listItemHeading}>
                                Patient
                            </Text>
                            <Text style={style?.listItemContent}>
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

