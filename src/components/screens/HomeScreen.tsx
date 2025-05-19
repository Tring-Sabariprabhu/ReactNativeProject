
import { useSelector } from 'react-redux';
import { styles } from '../../Assets/Styles/global';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from 'src/Redux/store';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { fonts } from 'src/Assets/Fonts';

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
            {/* <View style={style?.cardView}>
                <View style={style?.card}>
                    <Text style={style?.cardContent}>
                        Doctors
                    </Text>
                </View>
                <View style={style?.card}>
                    <Text style={style?.cardContent}>
                        Patients
                    </Text>
                </View>
                <View style={style?.card}>
                    <Text style={style?.cardContent}>
                        Add Doctor
                    </Text>
                </View>
            </View> */}
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
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    heading: {
        fontFamily: fonts?.MEDIUM,
        color: PRIMARY_COLOR,
        fontSize: 30,
    },
    cardView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 30,
    },
    card: {
        paddingVertical: 100,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        boxShadow: `1px 2px 2px 2px ${colors?.GRAY}`,
    },
    cardContent: {
        fontFamily: fonts?.LIGHT,
        fontSize: 18,
    },
});
