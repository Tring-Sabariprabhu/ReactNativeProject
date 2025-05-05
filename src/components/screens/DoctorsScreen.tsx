import { FlatList, Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { style } from './PatientsScreen';
import { getAllDoctors } from 'src/MockDatabase/MockAPIs/users';
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export const DoctorsScreen = () => {
    const [doctors, setDoctors] = useState(getAllDoctors());
    return (
        <View style={style?.screen}>
            <FlatList
                data={doctors}
                renderItem={({ item: doctor }) => (
                    <GestureRecognizer
                        key={doctor?.user_id}
                        onSwipeLeft={() => {
                            Toast.show(
                                {
                                    type: ALERT_TYPE?.SUCCESS,
                                    textBody: 'Swipe left performed',
                                });
                        }}
                        onSwipeRight={() => {
                            Toast.show(
                                {
                                    type: ALERT_TYPE?.SUCCESS,
                                    textBody: 'Swipe right performed',
                                });
                        }}>
                        <View style={style?.person} key={doctor?.user_id}>
                            <View>
                                <Text style={styles?.paragraph}>Doctor name </Text>
                                <Text style={style?.person_name}>{doctor?.user_name}</Text>
                            </View>
                        </View>

                    </GestureRecognizer>
                )} />
        </View>
    );
};
