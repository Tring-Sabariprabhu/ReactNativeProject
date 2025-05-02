import { Text, View } from 'react-native';
import { styles } from 'src/assets/styles/global';

export const ViewAppointmentsScreen = ()=>{
    return (
        <View style={styles?.screen}>
            <Text style={styles?.paragraph}>Appointments.</Text>
        </View>
    );
};
