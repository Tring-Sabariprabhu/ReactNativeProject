import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles/global';
import logo from '../../assets/images/galaxy_logo.png';
import {  CustomButton, CustomButtonTypes } from '../custom/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomTextInput } from '../custom/CustomTextInput';
import { fonts } from '../../assets/fonts';
import { useForm } from 'react-hook-form';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/assets/styles/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from 'src/redux/userSlice';
import { useDispatch } from 'react-redux';
import { signin, getCurrentUser } from 'src/mockDatabase/mockAPIs/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/validation/inputPatterns';
import { inputTypes } from 'src/assets/enums/inputTypes';

type RootStackParamList = {
    Signin: undefined;
    Signup: undefined;
};
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormValues {
    email: string,
    password: string
}
const schema = yup
    .object()
    .shape({
        email: yup.string()
            .required('Email is required')
            .matches(inputPatterns({ type: inputTypes?.EMAIL }), 'Email should be valid'),
        password: yup.string()
            .required('Password is required')
            .min(8, 'Password should be 8 characters'),
    });

export const SigninScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });
    const onSubmit = async (formdata: FormValues) => {
        try {
            const data = signin({ email: formdata?.email?.toLowerCase(), password: formdata?.password });
            await AsyncStorage.setItem('token', data?.user_id);
            const user = await getCurrentUser();
            Toast.show({
                ...toastStyle,
                ...toastLengthShort,
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Logged In Successfully',
            });
            setTimeout(() => {
                dispatch(setUser({
                    user_id: user?.user_id,
                    user_name: user?.user_name,
                    user_role: user?.user_role,
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
                        errMessage={errors?.email?.message}
                    />
                    <CustomTextInput
                        placeholder={'Password'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'default'}
                        control={control}
                        name={'password'}
                        errMessage={errors?.password?.message}
                    />
                </View>
                <CustomButton
                    type={CustomButtonTypes?.OPASITYBUTTON}
                    title={'Sign in'}
                    buttonStyle={SigninFormStyles?.button}
                    textStyle={SigninFormStyles?.buttonTextStyle}
                    onPress={handleSubmit(onSubmit)}
                    />
                <View style={SigninFormStyles?.footer}>
                    <Text style={styles?.paragraph}>
                        Don't have an Account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
                        <Text style={SigninFormStyles?.navigator}>
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
        paddingHorizontal: 40,
        gap: 100,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    container: {
        gap: 30,
    },
    heading: {
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
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    button: {
        ...styles?.button,
        borderRadius: 100,
        paddingVertical: 6,
        backgroundColor: colors?.color_blue,
    },
    buttonTextStyle: {
        color: colors?.color_white,
        fontFamily: fonts?.Medium,
        fontSize: 24,
        fontWeight: 500,
        textAlign: 'center',
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
