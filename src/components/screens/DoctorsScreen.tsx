import { Button, FlatList, Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { style } from './PatientsScreen';
import { getAllDoctors } from 'src/MockDatabase/MockAPIs/users';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { User } from 'src/MockDatabase/Types/Types';
import { Doctor, DoctorView } from './DoctorView';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Authentication/SigninScreen';

export const DoctorsScreen = () => {
    const [doctors, setDoctors] = useState(getAllDoctors());
    const [selectedDoctor, setSelectedDoctor] = useState<User>();
    const [showPopup, setShowPopup] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const refetch = ()=>{
        setDoctors(getAllDoctors());
    };


    return (
        <View style={style?.screen}>
            <FlatList
                data={doctors}
                renderItem={({ item: doctor }) => (
                    <GestureRecognizer
                        key={doctor?.user_id}
                        onSwipeLeft={() => {
                            if(doctor){
                                setSelectedDoctor(doctor);
                            }
                            setShowPopup(true);
                        }}
                        onSwipeRight={() => {
                            navigation?.;
                        }}>
                        <View style={style?.person} key={doctor?.user_id}>
                            <View>
                                <Text style={styles?.paragraph}>Doctor name </Text>
                                <Text style={style?.person_name}>{doctor?.user_name}</Text>
                            </View>
                        </View>

                    </GestureRecognizer>
                )} />
                <Button title={'Refetch'} onPress={refetch}/>
                <CustomPopup
                    type={CustomPopupTypes?.INFO}
                    title={'Doctor details'}
                    isOpen={showPopup}
                    closeButtonText={'Ok'}
                    onClose={()=> setShowPopup(false)}
                    childComponent={DoctorView(selectedDoctor as Doctor)}/>
        </View>
    );
};


