import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { Controller, useForm } from 'react-hook-form';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { NavigationProp, SigninFormStyles } from '../Authentication/SigninScreen';
import { addDoctor, getDoctor } from 'src/MockDatabase/MockAPIs/users';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/Assets/Styles/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/Validation/inputPatterns';
import { inputTypes } from 'src/Assets/Enums/inputTypes';
import { Picker } from '@react-native-picker/picker';
import { ErrorMessage } from '../Custom/ErrorMessage';
import { DaysList, DoctorSpecialists, UserGender } from 'src/MockDatabase/Enums/users';
import { useEffect, useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { styles } from 'src/Assets/Styles/global';
import { CustomCheckbox } from '../Custom/CustomCheckbox';
import { colors } from 'src/Assets/Enums/colors';
import { Work_days } from 'src/MockDatabase/Types/Types';
import { Doctor, ViewUser } from '../Custom/ViewUser';
import { useNavigation } from '@react-navigation/native';
import { privateScreens } from 'src/Assets/Enums/screens';
import { fonts } from 'src/Assets/Fonts';

interface FormValues {
    doctor_name: string
    doctor_age: number
    doctor_gender: UserGender
    speciality: DoctorSpecialists
    email: string
    work_days: Work_days
}
const schema = yup
    .object()
    .shape({
        doctor_name: yup.string()
            .trim()
            .required('Name is required')
            .matches(inputPatterns({ type: inputTypes?.NAME }), 'Name should be valid'),
        doctor_age: yup.number()
            .typeError('Age should be number')
            .required('Age is required')
            .min(21, 'Age should be above 20')
            .max(90, 'Age is too large'),
        doctor_gender: yup.string()
            .required('Gender is required')
            .oneOf([UserGender?.MALE, UserGender?.FEMALE], 'Gender should be Male or Female'),
        speciality: yup.string()
            .required('Speciality is required')
            .oneOf([DoctorSpecialists?.CARDIOLOGY, DoctorSpecialists?.DERMATOLOGY], 'Choose valid Speciality'),
        work_days: yup.object().shape({
            monday: yup.boolean().required(),
            tuesday: yup.boolean().required(),
            wednesday: yup.boolean().required(),
            thursday: yup.boolean().required(),
            friday: yup.boolean().required(),
            saturday: yup.boolean().required(),
            sunday: yup.boolean().required(),
        }).required(),
        email: yup.string()
            .trim()
            .required('Email is required')
            .matches(inputPatterns({ type: inputTypes?.EMAIL }), 'Email should be valid'),
    });
export const AddDoctorScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [doctorDetails, setDoctorDetails] = useState<Doctor>();
    const [confirmPopup, setConfirmPopup] = useState(false);

    const defaultValues = {
        doctor_name: '',
        doctor_age: 0,
        doctor_gender: UserGender?.MALE,
        speciality: DoctorSpecialists?.CARDIOLOGY,
        email: '',
        work_days: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
    };

    const { control, handleSubmit, formState: { errors }, setValue, getValues, clearErrors } = useForm({
        shouldUnregister: false,
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        navigation?.addListener('blur', () => clearErrors());
    }, [navigation]);

    const addDoctorProcess = async () => {
        const doctor = getValues();
        if (doctor) {
            try {
                const {
                    email,
                    doctor_name,
                    doctor_age,
                    doctor_gender,
                    speciality,
                    work_days,
                } = doctor;
                const result = addDoctor(
                    {
                        email: email?.trim()?.toLowerCase(),
                        doctor_name: doctor_name?.trim(),
                        doctor_age,
                        doctor_gender,
                        speciality,
                        work_days,
                    });
                if (result) {
                    Toast?.show({
                        ...toastStyle,
                        ...toastLengthShort,
                        title: 'Success',
                        textBody: result,
                        type: ALERT_TYPE?.SUCCESS,
                    });
                    for (const [key, value] of Object.entries(defaultValues)) {
                        setValue(key as keyof FormValues, value);
                    }
                    navigation?.navigate(privateScreens?.Doctors);
                }
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

    const onSubmit = (formdata: FormValues) => {
        const {
            doctor_age,
            doctor_gender,
            doctor_name,
            email,
            speciality,
            work_days } = formdata;
        setDoctorDetails({
            user_name: doctor_name?.trim(),
            user_age: doctor_age,
            email: email?.trim()?.toLowerCase(),
            user_gender: doctor_gender,
            speciality: speciality,
            work_days: work_days,
        });
        setConfirmPopup(true);
    };

    return (
        <ScrollView>
            <View style={style?.screen}>
                <View style={style?.container}>
                    <CustomTextInput
                        name={'doctor_name'}
                        control={control}
                        placeholder={'Doctor name'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'default'}
                        errMessage={errors?.doctor_name?.message}
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
                        name={'doctor_age'}
                        control={control}
                        placeholder={'Doctor age'}
                        style={SigninFormStyles?.textInput}
                        keyboardType={'numeric'}
                        errMessage={errors?.doctor_age?.message}
                    />
                    <View>
                        <Picker
                            style={SigninFormStyles?.dropDown}
                            selectedValue={getValues('doctor_gender')}
                            mode={'dropdown'}
                            onValueChange={(value) => {
                                setValue('doctor_gender', value);
                            }}>
                            <Picker.Item label={'Male'}
                                value={UserGender?.MALE}
                                style={SigninFormStyles?.dropDownItem} />
                            <Picker.Item label={'Female'}
                                value={UserGender?.FEMALE}
                                style={SigninFormStyles?.dropDownItem} />
                        </Picker>
                        {errors?.doctor_gender?.message && <ErrorMessage message={errors?.doctor_gender?.message} />}
                    </View>
                    <View>
                        <Picker
                            style={SigninFormStyles?.dropDown}
                            selectedValue={getValues('speciality')}
                            mode={'dropdown'}
                            onValueChange={(value) => {
                                setValue('speciality', value);
                            }}>
                            <Picker.Item label={'Cardiology'}
                                value={DoctorSpecialists?.CARDIOLOGY}
                                style={SigninFormStyles?.dropDownItem} />
                            <Picker.Item label={'Dermatology'}
                                value={DoctorSpecialists?.DERMATOLOGY}
                                style={SigninFormStyles?.dropDownItem} />
                        </Picker>
                        {errors?.speciality?.message && <ErrorMessage message={errors?.speciality?.message} />}
                    </View>
                    <View style={style?.workDaysContainer}>
                        {
                            DaysList?.map((day) => (
                                <Controller
                                    key={day}
                                    name={`work_days.${day as keyof Work_days}`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomCheckbox
                                            text={day}
                                            isChecked={field?.value}
                                            onChange={field?.onChange}
                                            iconSize={26}
                                            iconColor={colors?.BLUE}
                                            textStyle={styles?.capitalizedContent} />
                                    )} />
                            ))
                        }
                    </View>
                    <CustomButton
                        type={CustomButtonTypes.OPASITYBUTTON}
                        title={'Add'}
                        buttonStyle={SigninFormStyles?.button}
                        textStyle={SigninFormStyles?.buttonTextStyle}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
                <CustomPopup
                    type={CustomPopupTypes?.INFO}
                    isOpen={confirmPopup}
                    title={'Do you want to add this Doctor details ? '}
                    onClose={() => setConfirmPopup(false)}
                    closeButtonText={'No'}
                    successButtonText={'Yes'}
                    onSuccess={addDoctorProcess}
                    childComponent={ViewUser(doctorDetails)}
                />
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        backgroundColor: colors?.WHITE,
    },
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        gap: 40,
    },
    workDaysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30,
    },
    label: {
        fontFamily: fonts?.MEDIUM,
        fontSize: 20,
    },
});
