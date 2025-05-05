import { StyleSheet, Text, View } from 'react-native';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { useForm } from 'react-hook-form';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { SigninFormStyles } from '../Authentication/SigninScreen';
import { addDoctor } from 'src/MockDatabase/MockAPIs/users';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/Assets/Styles/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/Validation/inputPatterns';
import { inputTypes } from 'src/Assets/Enums/inputTypes';
import { Picker } from '@react-native-picker/picker';
import { ErrorMessage } from '../Custom/ErrorMessage';
import { UserGender } from 'src/MockDatabase/Enums/users';
import { useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup';
import { styles } from 'src/Assets/Styles/global';
import { fonts } from 'src/Assets/Fonts';

interface FormValues {
    user_name: string
    user_age: number
    user_gender: UserGender
    email: string
}
const schema = yup
    .object()
    .shape({
        user_name: yup.string()
            .trim()
            .required('Name is required')
            .matches(inputPatterns({ type: inputTypes?.NAME }), 'Name should be valid'),
        user_age: yup.number()
            .typeError('Age should be number')
            .required('Age is required')
            .min(21, 'Age should be above 20')
            .max(90, 'Age is too large'),
        user_gender: yup.string()
            .required('Gender is required')
            .oneOf([UserGender?.MALE, UserGender?.FEMALE], 'Gender should be Male or Female'),
        email: yup.string()
            .trim()
            .required('Email is required')
            .matches(inputPatterns({ type: inputTypes?.EMAIL }), 'Email should be valid'),
    });
export const AddDoctorScreen = () => {
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
            user_name: '',
            user_age: 0,
            user_gender: UserGender?.MALE,
            email: '',
        },
        resolver: yupResolver(schema),
    });
    const addDoctorProcess = () => {
        if (doctorDetails) {
            try {
                const result = addDoctor(
                    {
                        email: doctorDetails?.email?.toLowerCase(),
                        user_name: doctorDetails?.user_name,
                        user_age: doctorDetails?.user_age,
                        user_gender: doctorDetails?.user_gender,
                    });
                Toast?.show({
                    ...toastStyle,
                    ...toastLengthShort,
                    title: 'Success',
                    textBody: result,
                    type: ALERT_TYPE?.SUCCESS,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    Toast?.show({
                        ...toastStyle,
                        title: 'Add Doctor failed',
                        textBody: err?.message,
                        type: ALERT_TYPE?.DANGER,
                    });
                }
            }
            setConfirmPopup(false);
        }
    };
    const [doctorDetails, setDoctorDetails] = useState<FormValues>();
    const [confirmPopup, setConfirmPopup] = useState(false);
    const onSubmit = (formdata: FormValues) => {
        setDoctorDetails(formdata);
        setConfirmPopup(true);
    };
    const selectedDoctor = () => (
        <View>
            <Text style={style?.paragraph}>
                {doctorDetails?.email}
            </Text>
            <Text style={style?.paragraph}>
                {doctorDetails?.user_name}
            </Text>
            <Text style={style?.paragraph}>
                {doctorDetails?.user_gender}
            </Text>
            <Text style={style?.paragraph}>
                {doctorDetails?.user_age}
            </Text>
        </View>
    );
    return (
        <View style={SigninFormStyles?.screen}>
            <View style={SigninFormStyles?.container}>
                <CustomTextInput
                    name={'user_name'}
                    control={control}
                    placeholder={'Doctor name'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'default'}
                    errMessage={errors?.user_name?.message}
                />
                <CustomTextInput
                    name={'email'}
                    control={control}
                    placeholder={'Doctor email'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'email-address'}
                    errMessage={errors?.email?.message}
                />
                <CustomTextInput
                    name={'user_age'}
                    control={control}
                    placeholder={'Doctor age'}
                    style={SigninFormStyles?.textInput}
                    keyboardType={'numeric'}
                    errMessage={errors?.user_age?.message}
                />
                <View>
                    <Picker
                        style={SigninFormStyles?.dropDown}
                        selectedValue={getValues('user_gender')}
                        mode={'dropdown'}
                        onValueChange={(value) => {
                            setValue('user_gender', value);
                        }}>
                        <Picker.Item label={'Male'} value={UserGender?.MALE} style={SigninFormStyles?.dropDownItem} />
                        <Picker.Item label={'Female'} value={UserGender?.FEMALE} style={SigninFormStyles?.dropDownItem} />
                    </Picker>
                    {errors?.user_gender?.message && <ErrorMessage message={errors?.user_gender?.message} />}
                </View>

                <CustomButton
                    type={CustomButtonTypes.OPASITYBUTTON}
                    title={'Add'}
                    buttonStyle={SigninFormStyles?.button}
                    textStyle={SigninFormStyles?.buttonTextStyle}
                    onPress={handleSubmit(onSubmit)} />
            </View>
            <CustomPopup
                type={CustomPopupTypes?.INFO}
                isOpen={confirmPopup}
                onClose={() => setConfirmPopup(false)}
                closeButtonText={'No'}
                textBody={'Do you want to add this Doctor details ? '}
                successButtonText={'Yes'}
                onSuccess={addDoctorProcess}
                childComponent={selectedDoctor()}
            />
        </View>
    );
};

const style = StyleSheet.create({
    paragraph: {
        ...styles?.capitalizedContent,
        fontFamily: fonts?.LIGHT,
        fontSize: 16,
    },
});
