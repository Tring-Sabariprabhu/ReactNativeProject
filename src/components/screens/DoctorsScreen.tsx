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
    const [selectedDoctor, setSelectedDoctor] = useState<User>();
    const [showPopup, setShowPopup] = useState(false);
    const [doctors, setDoctors] = useState<User[] | undefined>();
    const limit = 3;

    const refetch = () => {
        setDoctors(getAllDoctors({limit, offset: 0 }));
    };

    useEffect(() => {
        navigation?.addListener('focus', refetch);
    }, [navigation]);

    useEffect(()=>{
        refetch();
    },[]);
    return (
        <View style={style?.screen}>
            {
                <CustomList
                    listDirection={'column'}
                    listData={doctors}
                    listStyle={style?.listContainer}
                    paginatorProps={{
                        dataCount: getDoctorsCount(),
                        dataPerPage: limit,
                        direction: 'center',
                        containerSize: 2,
                        whenPageMoved(props) {
                            setDoctors(getAllDoctors({
                                limit,
                                offset: props?.offset,
                            }));
                        },
                    }}
                    renderItem={({ item: doctor }) => (
                        <View style={style?.person} key={doctor?.doctor_id}>
                            <Text style={styles?.paragraph}>Doctor name </Text>
                            <Text style={style?.person_name}>{doctor?.user_name}</Text>
                        </View>
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


