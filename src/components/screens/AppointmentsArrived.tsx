import { Text, View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { useState } from 'react';
import { User } from 'src/MockDatabase/Types/Types';
import { getAllDoctors, getAllPatients } from 'src/MockDatabase/MockAPIs/users';
import CardList from '../Custom/CustomSwipeActions/CustomSwipeActions';

export const AppointmentsArrived = () => {
    const patients = getAllPatients({
        limit: 10,
        offset: 0,
    });
    return (
        <View style={styles?.screen}>
            <CardList
                data={patients}
                renderCard={(item) => (
                    <>
                        <View>
                            <Text style={[styles?.capitalizedContent, { fontSize: 25 }]}>
                                {item?.user_name}
                            </Text>
                        </View>
                    </>
                )} />
        </View>
    );
};
