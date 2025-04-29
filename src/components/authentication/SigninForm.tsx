import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles/global';
import logo from '../../assets/images/galaxy_logo.png';
import { CustomButton } from '../custom/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomTextInput } from '../custom/CustomTextInput';
import { fonts } from '../../assets/fonts';
import { useForm } from 'react-hook-form';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastStyle } from 'src/assets/styles/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from 'src/redux/userSlice';
import { useDispatch } from 'react-redux';
import { signin, getCurrentUser } from 'src/mockDatabase/mockAPIs/auth';

type RootStackParamList = {
    Signin: undefined;
    Signup: undefined;
};

interface FormValues {
    email: string,
    password: string
}
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const SigninForm = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = async (formdata: FormValues) => {
        try {
            const data = signin({ email: formdata?.email?.toLowerCase(), password: formdata?.password });
            Toast.show({
                ...toastStyle,
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Logged In Successfully',
            });
            AsyncStorage.setItem('token', data?.user_id);
            const user = await getCurrentUser();
            setTimeout(()=> {
                dispatch(setUser({
                    user_id: user?.user_id,
                    user_name: user?.user_name,
                    email: user?.email,
                    age: user?.age,
                }));
            }, 500);
        }
        catch (err) {
            if (err instanceof Error) {
                Toast.show({
                    ...toastStyle,
                    type: ALERT_TYPE.DANGER,
                    title: 'Logging failed',
                    textBody: err?.message,
                });
            }
        }
    };

    return (
        <View style={SigninFormStyles?.screen}>
            <View style={SigninFormStyles.imageContainer}>
                <Image source={logo} style={SigninFormStyles?.image} />
            </View>
            <View style={SigninFormStyles?.container}>
                <Text style={SigninFormStyles?.heading}>Sign in</Text>
                <View style={SigninFormStyles?.inputContainer}>
                    <CustomTextInput
                        placeholder={'Email'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'email-address'}
                        control={control}
                        name={'email'}
                    />
                    <CustomTextInput
                        placeholder={'Password'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'default'}
                        control={control}
                        name={'password'}
                    />
                </View>
                <CustomButton
                    title={'Sign in'}
                    style={SigninFormStyles?.button}
                    onPress={handleSubmit(onSubmit)} />
                <View style={SigninFormStyles?.footer}>
                    <Text style={styles?.paragraph}>
                        Don't have an Account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={SigninFormStyles?.navigator}
                            onPress={() => navigation?.navigate('Signup')}>
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
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
    container: {
        flex: 3,
        gap: 30,
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
        // letterSpacing: 1,
        fontFamily: fonts?.Medium,
        color: colors?.color_blue,
        textAlign: 'center',
        fontSize: 35,
    },
    inputContainer: {
        gap: 20,
    },
    textInput: {
        ...styles?.textInput,
        fontFamily: fonts?.Light,
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    button: {
        ...styles?.button,
        fontSize: 24,
        fontWeight: 500,
        color: colors?.color_white,
        paddingVertical: 5,
        backgroundColor: colors?.color_blue,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    navigator: {
        fontFamily: fonts?.Medium,
        fontSize: 22,
        color: colors?.color_blue,
    },
});
