
import { useSelector } from 'react-redux';
import { styles } from '../../Assets/Styles/global';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from 'src/Redux/store';
import { colors } from 'src/Assets/Enums/colors';
import { fonts } from 'src/Assets/Fonts';
import { UserRole } from 'src/MockDatabase/Enums/users';

export const HomeScreen = () => {
    const user = useSelector((state: RootState) => state?.user);
    return (
        <View style={style?.screen}>
            <View style={style?.headingContainer}>
                <Text style={style?.heading}>
                    Welcome
                </Text>
                <Text style={[styles?.capitalizedContent, style?.heading, { color: colors?.DARK_BLUE }]}>
                    {user?.user_name},
                </Text>
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
    headingContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    heading: {
        fontFamily: fonts?.MEDIUM,
        color: colors?.BLUE,
        fontSize: 30,
    },
});
