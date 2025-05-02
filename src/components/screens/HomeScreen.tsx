
import { useSelector } from 'react-redux';
import { styles } from '../../assets/styles/global';
import { Text, View } from 'react-native';
import { RootState } from 'src/redux/store';

export const HomeScreen = ()=> {
    const user = useSelector((state: RootState)=> state?.user);
    return (
        <View style={styles?.screen}>
            <Text style={styles?.paragraph}>User name: {user?.user_name}</Text>
            <Text style={styles?.paragraph}>Role: {user?.user_role}</Text>
        </View>
    );
};
