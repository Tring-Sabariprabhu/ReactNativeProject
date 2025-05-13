import { Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { style } from './PatientsScreen';
import { getAllDoctors, getDoctorsCount } from 'src/MockDatabase/MockAPIs/users';
import { useEffect, useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { User } from 'src/MockDatabase/Types/Types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';
import { ViewUser } from '../Custom/ViewUser';
import { CustomList } from '../Custom/CustomList/CustomList';

export const DoctorsScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [showPopup, setShowPopup] = useState(false);
    const [doctors, setDoctors] = useState<User[] | undefined>();
    const [selectedDoctor, setSelectedDoctor] = useState<User | undefined>();
    const [totalCount, setTotalCount] = useState(0);
    const limit = 1;

    const refetch = () => {
        setTotalCount(getDoctorsCount());
    };

    useEffect(() => {
        navigation?.addListener('focus', () => {
            refetch();
        });
    }, [navigation]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <View style={style?.screen}>
            {
                <CustomList
                    listDirection={'column'}
                    listData={doctors}
                    listStyle={style?.listContainer}
                    paginatorProps={{
                        totalCount: totalCount,
                        dataPerPage: limit,
                        containerSize: 2,
                        containerPostion: 'center',
                        whenPageMoved: (props) => {
                            setDoctors(getAllDoctors({
                                limit: limit,
                                offset: props?.offset,
                            }));
                        },
                    }}
                    renderItem={({ item: doctor }) => (
                        <View style={style?.person}>
                            <Text style={styles?.paragraph} onPress={() => {
                                console.log(doctor);
                                setSelectedDoctor(doctor);
                                setShowPopup(true);
                            }}>Doctor </Text>
                            <Text style={style?.person_name}>{doctor?.user_name}</Text>
                            <Text style={style?.person_name}>{doctor?.speciality}</Text>
                        </View>
                    )} />}
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                title={'Doctor details'}
                titleStyle={{ fontSize: 25 }}
                isOpen={showPopup}
                closeButtonText={'Ok'}
                onClose={() => setShowPopup(false)}
                childComponent={ViewUser(selectedDoctor)}
                buttonStyle={styles?.popupButton}
                buttonTextStyle={styles?.popupButtonText} />
        </View>
    );
};


