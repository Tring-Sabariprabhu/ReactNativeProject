
import { useSelector } from 'react-redux';
import { colors, styles } from '../../Assets/Styles/global';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from 'src/Redux/store';

export const HomeScreen = () => {
    const user = useSelector((state: RootState) => state?.user);
    return (
        <View style={style?.screen}>
            <View style={style?.box}>
                <Text style={styles?.paragraph}>User ID: {user?.user_id}</Text>
                <Text style={styles?.paragraph}>Name: {user?.user_name}</Text>
                <Text style={styles?.paragraph}>Role: {user?.user_role}</Text>
                <Text style={styles?.paragraph}>Age: {user?.user_age}</Text>
                <Text style={styles?.paragraph}>Gender: {user?.user_gender}</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        padding: 10,
        paddingHorizontal: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors?.DARK_GRAY,
    },
});
