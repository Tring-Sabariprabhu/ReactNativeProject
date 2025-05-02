import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles/global';
import logo from '../../assets/images/galaxy_logo.png';
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from '../custom/CustomTextInput';
import { CustomButton, CustomButtonTypes } from '../custom/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { signup } from 'src/mockDatabase/mockAPIs/auth';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/assets/styles/toast';
import { publicScreens } from 'src/assets/enums/screens';
import { NavigationProp, SigninFormStyles } from './SigninScreen';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/validation/inputPatterns';
import { inputTypes } from 'src/assets/enums/inputTypes';

interface FormValues {
    email: string,
    name: string,
    age: number,
    password: string,
    confirm_password: string,
}
const schema = yup
    .object()
    .shape({
        name: yup.string()
            .trim()
            .required('Name is required')
            .matches(inputPatterns({ type: inputTypes?.NAME }), 'Name should be valid'),
        email: yup.string()
            .trim()
            .required('Email is required')
            .matches(inputPatterns({ type: inputTypes?.EMAIL }), 'Email should be valid'),
        age: yup.number()
            .typeError('Age should be number')
            .required('Age is required')
            .min(11, 'Age should be above 10')
            .max(90, 'Age is too large'),
        password: yup.string()
            .trim()
            .required('Password is required')
            .matches(inputPatterns({ type: inputTypes?.PASSWORD }), 'Password should contain at least one Uppercase, Lowercase letters, and a Special Symbol, a number'),
        confirm_password: yup.string()
            .trim()
            .required('Confirm password is required')
            .oneOf([yup.ref('password')], 'Passwords do not match'),
    });
export const SignupScreen = () => {

    const navigation = useNavigation<NavigationProp>();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            name: '',
            age: 0,
            password: '',
            confirm_password: '',
        },
        resolver: yupResolver(schema),
    });
    const onSubmit = (formdata: FormValues) => {
        try {
            const message = signup(
                {
                    email: formdata?.email?.toLowerCase(),
                    name: formdata?.name,
                    age: formdata?.age,
                    password: formdata?.password,
                });
            Toast.show({
                ...toastStyle,
                ...toastLengthShort,
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: message,
            });
            navigation?.navigate(publicScreens?.Signin);
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
        <ScrollView>
            <View style={SigninFormStyles?.screen}>
                <View style={SigninFormStyles.imageContainer}>
                    <Image source={logo} style={SigninFormStyles?.image} />
                </View>
                <View style={SigninFormStyles?.container}>
                    <Text style={SigninFormStyles?.heading}>Sign up</Text>
                    <CustomTextInput
                        placeholder={'Name'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'default'}
                        control={control}
                        name={'name'}
                        errMessage={errors?.name?.message}
                    />
                    <CustomTextInput
                        placeholder={'Email'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'email-address'}
                        control={control}
                        name={'email'}
                        errMessage={errors?.email?.message}
                    />
                    <CustomTextInput
                        placeholder={'Age'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'numeric'}
                        control={control}
                        name={'age'}
                        errMessage={errors?.age?.message}
                    />
                    <CustomTextInput
                        placeholder={'Password'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'default'}
                        control={control}
                        name={'password'}
                        errMessage={errors?.password?.message}
                    />
                    <CustomTextInput
                        placeholder={'Confirm password'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'default'}
                        control={control}
                        name={'confirm_password'}
                        errMessage={errors?.confirm_password?.message}
                    />
                    <CustomButton
                        type={CustomButtonTypes?.OPASITYBUTTON}
                        title={'Sign up'}
                        buttonStyle={SigninFormStyles?.button}
                        textStyle={SigninFormStyles?.buttonTextStyle}
                        onPress={handleSubmit(onSubmit)}
                        />
                    <View style={SigninFormStyles?.footer}>
                        <Text style={styles?.paragraph}>
                            Already have an Account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate('Signin')}>
                            <Text style={SigninFormStyles?.navigator}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
