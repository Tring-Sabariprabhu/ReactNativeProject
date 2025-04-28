import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles/global';
import logo from '../../assets/images/galaxy_logo.png';
import { ButtonField } from '../custom/ButtonField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInputField } from '../custom/TextInputField';

type RootStackParamList = {
    Signin: undefined;
    Signup: undefined;
  };
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const SigninForm = () => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={SigninFormStyles?.screen}>
            <View style={SigninFormStyles.imageContainer}>
                <Image source={logo} style={SigninFormStyles?.image} />
            </View>
            <View style={SigninFormStyles?.container}>
                <Text style={SigninFormStyles?.heading}>Sign in</Text>
                <View style={SigninFormStyles?.inputContainer}>
                   <TextInputField placeholder={'Email'} style={SigninFormStyles?.textInput}/>
                   <TextInputField placeholder={'Password'} style={SigninFormStyles?.textInput}/>
                </View>
                <ButtonField title={'Sign in'} style={SigninFormStyles?.button}/>
                <View style={SigninFormStyles?.footer}>
                    <Text style={styles?.text}>
                        Don't have an Account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={SigninFormStyles?.navigator}
                            onPress={()=> navigation?.navigate('Signup')}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export const SigninFormStyles = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.color_white,
        padding: 10,
        paddingHorizontal: 25,
    },
    container: {
        flex: 2,
        gap: 25,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    heading: {
        letterSpacing: 1,
        color: colors?.color_blue,
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 600,
    },
    inputContainer: {
        gap: 20,
    },
    textInput:{
        ...styles?.textInput,
        fontSize: 18,
        padding: 16,
    },
    button: {
        ...styles?.button,
        fontSize: 23,
        fontWeight: 500,
        color: colors?.color_white,
        paddingVertical: 10,
        backgroundColor: colors?.color_blue,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    navigator: {
        fontSize: 20,
        color: colors?.color_blue,
    },
});
