import {  Text, View, ScrollView } from 'react-native';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { Controller, useForm } from 'react-hook-form';
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
import { Days, DaysList, DoctorSpecialists, UserGender } from 'src/MockDatabase/Enums/users';
import { useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { styles } from 'src/Assets/Styles/global';
import { CustomCheckbox } from '../Custom/CustomCheckbox';
import { colors } from 'src/Assets/Enums/colors';
import { Doctor, DoctorView } from './DoctorView';


interface FormValues {
    doctor_name: string
    doctor_age: number
    doctor_gender: UserGender
    speciality: DoctorSpecialists
    email: string
    work_days: {
        monday: boolean,
        tuesday: boolean,
        wednesday: boolean,
        thursday: boolean,
        friday: boolean,
        saturday: boolean,
        sunday: boolean,
    }
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
    const { control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({
        shouldUnregister: false,
        defaultValues: {
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
        },
        resolver: yupResolver(schema),
    });


    const addDoctorProcess = () => {
        if (doctorDetails) {
            try {
                const {
                    email,
                    user_name,
                    user_age,
                    user_gender,
                    speciality,
                    work_days,
                } = doctorDetails;
                    const result = addDoctor(
                        {
                            email: email?.toLowerCase(),
                            doctor_name: user_name,
                            doctor_age: user_age,
                            doctor_gender: user_gender,
                            speciality: speciality,
                            work_days: work_days,
                        });
                    Toast?.show({
                        ...toastStyle,
                        ...toastLengthShort,
                        title: 'Success',
                        textBody: result,
                        type: ALERT_TYPE?.SUCCESS,
                    });
                    reset();
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
    const [doctorDetails, setDoctorDetails] = useState<Doctor>();
    const [confirmPopup, setConfirmPopup] = useState(false);

    const onSubmit = (formdata: FormValues) => {
        let work_days: Days[] = [];
        DaysList.forEach(day => {
            if (formdata?.work_days[day]) {
                work_days.push(day);
            }
        });
        const {
            doctor_age,
            doctor_gender,
            doctor_name,
            email,
            speciality } = formdata;
        setDoctorDetails({
            user_name: doctor_name,
            user_age: doctor_age,
            email: email,
            user_gender: doctor_gender,
            speciality,
            work_days,
        });
        setConfirmPopup(true);
    };

    return (
        <ScrollView>
            <View style={SigninFormStyles?.screen}>
                <View style={SigninFormStyles?.container}>
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
                    <Text style={styles?.highlightedParagraph}>
                        Work days
                    </Text>
                    {
                        DaysList?.map((day) => (
                            <Controller
                                key={day}
                                name={`work_days.${day}`}
                                control={control}
                                render={({ field }) => (
                                    <CustomCheckbox
                                        text={day}
                                        isChecked={field?.value}
                                        onChange={field?.onChange}
                                        iconSize={20}
                                        iconColor={colors?.BLUE}
                                        textStyle={styles?.capitalizedContent} />
                                )} />
                        ))
                    }
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
                    onClose={() => setConfirmPopup(false)}
                    closeButtonText={'No'}
                    title={'Do you want to add this Doctor details ? '}
                    successButtonText={'Yes'}
                    onSuccess={addDoctorProcess}
                    childComponent={DoctorView(doctorDetails)}
                />
            </View>
        </ScrollView>
    );
};
