import { View } from 'react-native';
import { styles } from 'src/Assets/Styles/global';
import { useState } from 'react';
import { User } from 'src/MockDatabase/Types/Types';
import { getAllDoctors } from 'src/MockDatabase/MockAPIs/users';

export const AppointmentsArrived = ()=>{
    const [doctors, setDoctors] = useState<User[] | undefined>(getAllDoctors({
        limit: 5,
        offset: 0,
    }));
    const doctor_names = doctors?.map((doctor)=>doctor?.user_name);
    return (
        <View style={styles?.screen}>
        </View>
    );
};
