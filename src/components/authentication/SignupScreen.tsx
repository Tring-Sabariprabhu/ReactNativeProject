import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { signup } from 'src/MockDatabase/MockAPIs/auth';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/Assets/Styles/toast';
import { style } from './SigninScreen';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/Validation/inputPatterns';
import { inputTypes } from 'src/Validation/inputPatterns';
import { UserGender } from 'src/MockDatabase/Enums/users';
import { SelectInput } from '../Custom/SelectInput';
import { useState } from 'react';
import auth_logo from '../../Assets/Images/login_background.jpg';
import { screens } from 'src/Assets/Enums/screens';
import { NavigationProp } from '../Types/NavigationProp';

interface FormValues {
    email: string;
    name: string;
    age: number;
    gender: string;
    telphone: string;
    password: string;
    confirm_password: string;
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
        gender: yup.string()
            .required('Gender is required')
            .oneOf([UserGender?.MALE, UserGender?.FEMALE], 'Gender should be Male or Female'),
        telphone: yup.string()
            .min(10, 'Mobile number should be valid')
            .required('Mobile number is required'),
        password: yup.string()
            .trim()
            .required('Password is required')
            .matches(inputPatterns({ type: inputTypes?.PASSWORD }), 'Password should contain at least one Uppercase, Lowercase letters, and a Special Symbol, a number'),
        confirm_password: yup.string()
            .trim()
            .required('Confirm password is required')
            .oneOf([yup.ref('password')], 'Password do not match'),
    });
export const SignupScreen = () => {

    const navigation = useNavigation<NavigationProp>();

    const { control, handleSubmit, formState: { errors } , setError} = useForm<FormValues>({
        defaultValues: {
            email: '',
            name: '',
            age: 0,
            gender: '',
            telphone: '',
            password: '',
            confirm_password: '',
        },
        resolver: yupResolver(schema),
    });
    const onSubmit = (formdata: FormValues) => {
        try {
            setDisableMode(true);
            const { email, name, age, gender, password, telphone } = formdata;
            const message = signup(
                {
                    user_name: name?.trim(),
                    user_age: age,
                    user_gender: gender,
                    email: email?.trim()?.toLowerCase(),
                    telphone,
                    password: password?.trim(),
                });
            setDisableMode(false);
            if(message){
                Toast.show({
                    ...toastStyle,
                    ...toastLengthShort,
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: message,
                });
                navigation?.navigate(screens?.Signin);
            }
        }
        catch (err) {
            setDisableMode(false);
            if (err instanceof Error) {
                const message = err?.message?.toLowerCase();
                if(message?.includes('already exists')){
                    setError('email', {message: err?.message});
                }else{
                    Toast.show({
                        ...toastStyle,
                        type: ALERT_TYPE.DANGER,
                        title: 'Logging failed',
                        textBody: err?.message,
                    });
                }
            }
        }
    };
    const [disableMode, setDisableMode ] = useState(false);
    return (
        <ScrollView>
            <View style={style?.screen}>
                <View style={style?.container}>
                    <View style={style.imageContainer}>
                        <Image source={auth_logo} style={style?.image} />
                    </View>
                    <View style={style?.formContainer}>
                        <View style={style?.headingContainer}>
                            <Text style={style?.heading}>
                                Create your Account here!
                            </Text>
                        </View>
                        <CustomTextInput
                            required
                            label={'Name'}
                            labelStyle={style?.label}
                            placeholder={'Enter name'}
                            inputStyle={style?.textInput}
                            keyboardType={'default'}
                            control={control}
                            name={'name'}
                            errorMessage={errors?.name?.message}
                        />
                        <CustomTextInput
                            required
                            label={'Email'}
                            labelStyle={style?.label}
                            placeholder={'Enter email'}
                            inputStyle={style?.textInput}
                            keyboardType={'email-address'}
                            control={control}
                            name={'email'}
                            errorMessage={errors?.email?.message}
                        />
                        <CustomTextInput
                            required
                            label={'Age'}
                            labelStyle={style?.label}
                            placeholder={'Enter age'}
                            maxLength={2}
                            inputStyle={style?.textInput}
                            keyboardType={'numeric'}
                            control={control}
                            name={'age'}
                            errorMessage={errors?.age?.message}
                        />
                        <SelectInput
                            label={'Gender'}
                            labelStyle={style?.label}
                            required
                            placeHolder={'Select Gender'}
                            name={'gender'}
                            control={control}
                            items={[
                                {
                                    key: UserGender?.MALE,
                                    label: 'Male',
                                    value: UserGender?.MALE,
                                },
                                {
                                    key: UserGender?.FEMALE,
                                    label: 'Female',
                                    value: UserGender?.FEMALE,
                                },
                            ]}
                            errorMessage={errors?.gender?.message} />
                            <CustomTextInput
                                required
                                label={'Mobile number'}
                                labelStyle={style?.label}
                                placeholder={'Enter mobile number'}
                                inputStyle={style?.textInput}
                                keyboardType={'numeric'}
                                control={control}
                                name={'telphone'}
                                maxLength={10}
                                errorMessage={errors?.telphone?.message}
                            />
                        <CustomTextInput
                            required
                            isSecureInput
                            label={'Password'}
                            labelStyle={style?.label}
                            placeholder={'Enter password'}
                            inputStyle={style?.textInput}
                            keyboardType={'default'}
                            control={control}
                            name={'password'}
                            errorMessage={errors?.password?.message}
                        />
                        <CustomTextInput
                            required
                            isSecureInput
                            label={'Confirm password'}
                            labelStyle={style?.label}
                            placeholder={'Re-enter your password'}
                            inputStyle={style?.textInput}
                            keyboardType={'default'}
                            control={control}
                            name={'confirm_password'}
                            errorMessage={errors?.confirm_password?.message}
                        />
                        <CustomButton
                            disableMode={disableMode}
                            type={CustomButtonTypes?.OPASITYBUTTON}
                            title={'Register'}
                            buttonStyle={style?.button}
                            textStyle={style?.buttonTextStyle}
                            onPress={handleSubmit(onSubmit)}
                        />
                        <View style={style?.footer}>
                            <Text style={style?.footerText}>
                                Already have an Account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation?.navigate(screens?.Signin)} disabled={disableMode}>
                                <Text style={style?.navigator}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
