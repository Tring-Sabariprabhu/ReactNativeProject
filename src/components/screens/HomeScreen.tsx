
import { useSelector } from 'react-redux';
import { styles } from '../../Assets/Styles/global';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from 'src/Redux/store';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { fonts } from 'src/Assets/Fonts';
import { Loader } from '../Custom/Loader';
import LottieView from 'lottie-react-native';

export const HomeScreen = () => {
    const user = useSelector((state: RootState) => state?.user);

    return (
        <View style={style?.screen}>
            {
                user?.user_role ?
                    <View>
                        <LottieView
                            source={require('src/Assets/AnimationFiles/doctor.json')}
                            autoPlay
                            style={style?.animatedImage} />
                        <View style={style?.container}>
                            <Text style={style?.heading}>
                                Welcome
                            </Text>
                            {user?.user_name &&
                                <Text style={[styles?.paragraph, {textTransform: 'capitalize'}]}>
                                    {user?.user_name},
                                </Text>}
                        </View>
                    </View> :
                    <Loader size={40} />
            }
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors?.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontFamily: fonts?.MEDIUM,
        color: PRIMARY_COLOR,
        fontSize: 30,
    },
    container: {
        alignItems: 'center',
    },
    animatedImage: {
        width: 350,
        height: 350,
    },
});
