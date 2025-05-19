import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../Assets/Images/galaxy_logo.png';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { fonts } from '../../Assets/Fonts';
import { useForm } from 'react-hook-form';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from 'src/Redux/userSlice';
import { useDispatch } from 'react-redux';
import { signin, getCurrentUser } from 'src/MockDatabase/MockAPIs/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/Validation/inputPatterns';
import { inputTypes } from 'src/Assets/Enums/inputTypes';
import { toastStyle } from 'src/Assets/Styles/toast';
import { styles } from 'src/Assets/Styles/global';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { useState } from 'react';

type RootStackParamList = {
    Signin: undefined;
    Signup: undefined;
    Home: undefined;
    AddDoctor: undefined;
    Doctors: undefined
    Patients: undefined
};
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormValues {
    email: string;
    password: string;
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

    const { control, handleSubmit, formState: { errors }, watch, setError } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });
    const onSubmit = async (formdata: FormValues) => {
        try {
            setDisableMode(true);
            const { email, password } = formdata;
            const data = signin({ email: email?.toLowerCase(), password: password });
            setDisableMode(false);
            if (data?.user_id) {
                await AsyncStorage.setItem('token', data?.user_id);
            }
            const user = await getCurrentUser();
            setTimeout(() => {
                dispatch(setUser({
                    user_id: user?.user_id,
                    user_name: user?.user_name,
                    user_role: user?.user_role,
                    user_gender: user?.user_gender,
                    user_age: user?.user_age,
                    email: user?.email,
                    refetchToken: true,
                }));
            }, 1000);
        }
        catch (err) {
            setDisableMode(false);
            if (err instanceof Error) {
                const message = err?.message?.toLowerCase();
                if (message?.includes('user not found')) {
                    setError('email', { message: err?.message });
                } else if (message?.includes('password incorrect')) {
                    setError('password', { message: err?.message });
                } else {
                    Toast.show({
                        ...toastStyle,
                        type: ALERT_TYPE.DANGER,
                        textBody: err?.message,
                    });
                }
            }
        }
    };
    const [disableMode, setDisableMode] = useState(false);
    return (
        <View style={style?.screen}>
            <View style={style?.container}>
                <View style={style.imageContainer}>
                    <Image source={logo} style={style?.image} />
                </View>
                <View style={style?.formContainer}>
                    <View style={style?.headingContainer}>
                        <Text style={style?.heading}>
                            Let's Sign you in.
                        </Text>
                        <Text style={style?.content}>
                            Please Sign in to continue
                        </Text>
                    </View>
                    <CustomTextInput
                        required
                        placeholder={'Enter email'}
                        inputStyle={style?.textInput}
                        label={'Email'}
                        labelStyle={style?.label}
                        keyboardType={'email-address'}
                        control={control}
                        name={'email'}
                        value={watch('email')}
                        errMessage={errors?.email?.message}
                    />
                    <CustomTextInput
                        required
                        isSecureInput
                        placeholder={'Enter password'}
                        inputStyle={style?.textInput}
                        label={'Password'}
                        labelStyle={style?.label}
                        keyboardType={'default'}
                        control={control}
                        name={'password'}
                        value={watch('password')}
                        errMessage={errors?.password?.message}
                    />
                    <CustomButton
                        disableMode={disableMode}
                        type={CustomButtonTypes?.OPASITYBUTTON}
                        title={'Sign in'}
                        buttonStyle={style?.button}
                        textStyle={style?.buttonTextStyle}
                        onPress={handleSubmit(onSubmit)}
                    />
                    <View style={style?.footer}>
                        <Text style={style?.footerText}>
                            Don't have an Account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate('Signup')} disabled={disableMode}>
                            <Text style={style?.navigator}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
};

export const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
        paddingHorizontal: 40,
        paddingVertical: 80,
    },
    imageContainer: {
        // justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 10,
        gap: 40,
    },
    formContainer: {
        gap: 20,
    },
    headingContainer: {
        paddingVertical: 5,
    },
    heading: {
        fontFamily: fonts?.MEDIUM,
        color: PRIMARY_COLOR,
        opacity: 0.8,
        textAlign: 'left',
        fontSize: 28,
    },
    content: {
        paddingStart: 5,
        fontFamily: fonts?.LIGHT,
        opacity: 0.5,
        fontSize: 12,
    },
    inputContainer: {
        gap: 10,
    },
    textInput: {
        ...styles?.textInput,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    label: {
        ...styles?.label,
        fontSize: 16,
        paddingStart: 10,
        opacity: 0.7,
    },
    button: {
        ...styles?.button,
        borderRadius: 8,
        paddingVertical: 6,
        backgroundColor: PRIMARY_COLOR,
    },
    buttonTextStyle: {
        color: colors?.WHITE,
        fontFamily: fonts?.MEDIUM,
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
    footerText: {
        fontFamily: fonts?.REGULAR,
        fontSize: 16,
        opacity: 0.6,
    },
    navigator: {
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
        color: colors?.DARK_BLUE,
    },
});
