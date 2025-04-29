import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles/global';
import { NavigationProp, SigninFormStyles } from './SigninForm';
import logo from '../../assets/images/galaxy_logo.png';
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from '../custom/CustomTextInput';
import { CustomButton } from '../custom/CustomButton';
import { useForm } from 'react-hook-form';
import { signup } from 'src/mockDatabase/mockAPIs/auth';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastStyle } from 'src/assets/styles/toast';
import { screens } from 'src/assets/enums/screens';

interface FormValues {
    user_name: string,
    email: string,
    age: number,
    password: string,
    confirm_password: string
}
export const SignupForm = () => {
    const navigation = useNavigation<NavigationProp>();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            name: '',
            age: '',
            password: '',
            confirm_password: '',
        },
    });
    const onSubmit = (formdata: FormValues) => {
        try {
            const message = signup(
                {
                    email: formdata?.email?.toLowerCase(),
                    name: formdata?.user_name,
                    age: formdata?.age,
                    password: formdata?.password,
                });
            Toast.show({
                ...toastStyle,
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: message,
            });
            navigation?.navigate(screens?.Signin);
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
                <Text style={SigninFormStyles?.heading}>Sign up</Text>
                <CustomTextInput
                    placeholder={'Name'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'default'}
                    control={control}
                    name={'name'}
                />
                <CustomTextInput
                    placeholder={'Email'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'email-address'}
                    control={control}
                    name={'email'}
                />
                <CustomTextInput
                    placeholder={'Age'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'numeric'}
                    control={control}
                    name={'age'}
                />
                <CustomTextInput
                    placeholder={'Password'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'default'}
                    control={control}
                    name={'password'}
                />
                <CustomTextInput
                    placeholder={'Confirm password'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'default'}
                    control={control}
                    name={'confirm_password'} />
                <CustomButton
                    title={'Sign up'}
                    style={SigninFormStyles?.button}
                    onPress={handleSubmit(onSubmit)} />
                <View style={SigninFormStyles?.footer}>
                    <Text style={styles?.paragraph}>
                        Already have an Account?
                    </Text>
                    <TouchableOpacity>
                        <Text style={SigninFormStyles?.navigator}
                            onPress={() => navigation?.navigate('Signin')}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
