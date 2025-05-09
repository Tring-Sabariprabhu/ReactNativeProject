import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../Assets/Images/galaxy_logo.png';
import {  CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
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
import { toastLengthShort, toastStyle } from 'src/Assets/Styles/toast';
import { styles } from 'src/Assets/Styles/global';
import { colors } from 'src/Assets/Enums/colors';

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
            if(data?.user_id){
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
                Toast.show({
                    ...toastStyle,
                    ...toastLengthShort,
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Logged In Successfully',
                });
            }, 1000);
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
        backgroundColor: colors?.WHITE,
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
        paddingTop: 10,
        gap: 30,
    },
    heading: {
        fontFamily: fonts?.MEDIUM,
        color: colors?.BLUE,
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
    dropDown: {
        backgroundColor: colors.LIGHT_GRAY,
        borderColor: colors?.BLACK,
        borderWidth: 1,
    },
    dropDownItem: {
        ...styles?.paragraph,
        padding: 10,
    },
    button: {
        ...styles?.button,
        borderRadius: 10,
        paddingVertical: 6,
        backgroundColor: colors?.BLUE,
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
    navigator: {
        fontFamily: fonts?.MEDIUM,
        fontSize: 22,
        color: colors?.BLUE,
    },
});
