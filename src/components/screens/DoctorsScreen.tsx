import { Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { style } from './PatientsScreen';
import { getAllDoctors } from 'src/MockDatabase/MockAPIs/users';
import { useEffect, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { User } from 'src/MockDatabase/Types/Types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';
import { ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export const DoctorsScreen = () => {
    const [doctors, setDoctors] = useState(getAllDoctors());
    const [selectedDoctor, setSelectedDoctor] = useState<User>();
    const [showPopup, setShowPopup] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const refetch = () => {
        setDoctors(getAllDoctors());
    };

    useEffect(() => {
        navigation?.addListener('focus', refetch);
    }, [navigation]);
    return (
        <View style={style?.screen}>
            {
                <CustomList
                    listDirection={'column'}
                    listData={doctors}
                    listStyle={style?.listContainer}
                    paginatorProps={{
                        numberOfPages: 1,
                        direction: 'center',
                        containerSize: 2,
                        startingPage: 1,
                        whenPageMoved(page) {
                            setDoctors(getAllDoctors());
                        },
                    }}
                    renderItem={({ item: doctor }) => (
                        <GestureRecognizer
                            key={doctor?.user_id}
                            onSwipeLeft={() => {
                                if (doctor) {
                                    setSelectedDoctor(doctor);
                                }
                                setShowPopup(true);
                            }}>
                            <View style={style?.person}>
                                <Text style={styles?.paragraph}>Doctor name </Text>
                                <Text style={style?.person_name}>{doctor?.user_name}</Text>
                            </View>
                        </GestureRecognizer>
                    )} />
            }
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Doctor details'}
                titleStyle={{ fontSize: 25 }}
                isOpen={showPopup}
                closeButtonText={'Ok'}
                onClose={() => setShowPopup(false)}
                childComponent={ViewUser(selectedDoctor)} />
        </View>
    );
};


