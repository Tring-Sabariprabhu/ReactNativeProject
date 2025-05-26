import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { Controller, useForm } from 'react-hook-form';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { style as formStyles } from '../Authentication/SigninScreen';
import { addDoctor } from 'src/MockDatabase/MockAPIs/users';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/Assets/Styles/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/Validation/inputPatterns';
import { inputTypes } from 'src/Validation/inputPatterns';
import { UserGender } from 'src/MockDatabase/Enums/users';
import { DoctorSpecialists, Days } from 'src/MockDatabase/Enums/doctors';
import { useEffect, useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { styles } from 'src/Assets/Styles/global';
import { CustomCheckbox } from '../Custom/CustomCheckbox';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { useNavigation } from '@react-navigation/native';
import { fonts } from 'src/Assets/Fonts';
import { SelectInput } from '../Custom/SelectInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ErrorMessage } from '../Custom/ErrorMessage';
import { screens } from 'src/Assets/Enums/screens';
import { NavigationProp } from '../Types/NavigationProp';
import { getTime } from 'src/Schema/MomentFunctions';


interface WorkDays {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}
interface FormValues {
    doctor_name: string;
    doctor_age: number;
    doctor_gender: string;
    speciality: string;
    email: string;
    telphone: string;
    inTime: Date;
    outTime: Date;
    work_days: WorkDays;
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
            .oneOf([UserGender?.MALE, UserGender?.FEMALE], 'Choose valid Gender'),
        telphone: yup.string()
            .min(10, 'Mobile number should be 10 digits')
            .required('Mobile number is required'),
        speciality: yup.string()
            .required('Speciality is required')
            .oneOf([DoctorSpecialists?.CARDIOLOGY, DoctorSpecialists?.DERMATOLOGY], 'Choose valid Speciality'),
        inTime: yup.date()
            .typeError('In Time should be valid')
            .required('In Time is required'),
        outTime: yup.date()
            .typeError('Out Time should be valid')
            .required('Out Time is required'),
        work_days: yup.object().shape({
            monday: yup.boolean().required(),
            tuesday: yup.boolean().required(),
            wednesday: yup.boolean().required(),
            thursday: yup.boolean().required(),
            friday: yup.boolean().required(),
            saturday: yup.boolean().required(),
            sunday: yup.boolean().required(),
        }).required('Work days is Required')
            .test('At least 2 days', 'Select atleast 2 Work days', (value) => {
                const count = (Object.values(value).filter(Boolean)).length;
                return count >= 2;
            }),
        email: yup.string()
            .trim()
            .required('Email is required')
            .matches(inputPatterns({ type: inputTypes?.EMAIL }), 'Email should be valid'),
    });
export const AddDoctorScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [inTimePicker, setInTimePicker] = useState(false);
    const [outTimePicker, setOutTimePicker] = useState(false);

    const defaultFormValues = {
        doctor_name: '',
        doctor_age: 0,
        doctor_gender: '',
        speciality: '',
        email: '',
        telphone: '',
        inTime: '',
        outTime: '',
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

    const { control, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, watch } = useForm({
        shouldUnregister: false,
        defaultValues: defaultFormValues,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        navigation?.addListener('blur', () => {
            setDefaultValues();
            clearErrors();
        });
    }, [navigation]);

    const setDefaultValues = () => {
        for (const [key, value] of Object.entries(defaultFormValues)) {
            setValue(key as keyof FormValues, value);
        }
    };

    const addDoctorProcess = async () => {
        const doctor = getValues();
        if (doctor) {
            try {
                const {
                    email,
                    doctor_name,
                    doctor_age,
                    doctor_gender,
                    telphone,
                    speciality,
                    inTime,
                    outTime,
                } = doctor;
                const work_days: Days[] = [];
                Object.keys(doctor.work_days).map((day) => {
                    if (doctor.work_days[day as keyof WorkDays]) {
                        work_days.push(Days[day as keyof WorkDays]);
                    }
                });
                const result = addDoctor(
                    {
                        email: email?.trim()?.toLowerCase(),
                        doctor_name: doctor_name?.trim(),
                        doctor_age,
                        doctor_gender,
                        speciality,
                        telphone,
                        work_days,
                        inTime,
                        outTime,
                    });
                if (result) {
                    Toast?.show({
                        ...toastStyle,
                        ...toastLengthShort,
                        title: 'Success',
                        textBody: result,
                        type: ALERT_TYPE?.SUCCESS,
                    });
                    setDefaultValues();
                    navigation?.navigate(screens?.DoctorsStack);
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    Toast?. show({
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

    const onSubmit = () => {
        setConfirmPopup(true);
    };

    const setTimeValue = (formValue: 'inTime' | 'outTime', value: Date) => {
        const minutesCheck = () => {
            const minutes = moment(value).get('minute');
            if (minutes === 30 || minutes === 0) {
                return true;
            } else {
                return false;
            }
        };
        if (formValue === 'inTime') {
            setInTimePicker(false);
            const outTime = watch('outTime');
            let check = true;
            if (outTime) {
                if (moment(outTime).isAfter(value)) {
                    check = true;
                } else {
                    check = false;
                    Toast.show({
                        ...toastStyle,
                        type: ALERT_TYPE?.DANGER,
                        textBody: 'Select valid In time',
                    });
                }
            } else if (check) {
                if (minutesCheck()) {
                    setValue(formValue, value);
                } else {
                    Toast.show({
                        ...toastStyle,
                        type: ALERT_TYPE?.DANGER,
                        textBody: 'Set minutes 00 or 30',
                    });
                }
            }
        } else {
            setOutTimePicker(false);
            const inTime = watch('inTime');
            if (!inTime) {
                Toast.show({
                    ...toastStyle,
                    type: ALERT_TYPE?.DANGER,
                    textBody: 'Select In Time first',
                });
            } else if (moment(value).isAfter(inTime)) {
                if (minutesCheck()) {
                    setValue(formValue, value);
                } else {
                    Toast.show({
                        ...toastStyle,
                        type: ALERT_TYPE?.DANGER,
                        textBody: 'Set minutes 00 or 30',
                    });
                }
            } else {
                Toast.show({
                    ...toastStyle,
                    type: ALERT_TYPE?.DANGER,
                    textBody: 'Select valid Out time',
                });
            }
        }
    };
    return (
        <ScrollView>
            <View style={style?.screen}>
                <View style={style?.container}>
                    <CustomTextInput
                        label={'Doctor name'}
                        labelStyle={style?.label}
                        required
                        placeholder={'Enter doctor name'}
                        name={'doctor_name'}
                        control={control}
                        inputStyle={formStyles?.textInput}
                        keyboardType={'default'}
                        errorMessage={errors?.doctor_name?.message}
                    />
                    <CustomTextInput
                        label={'Doctor email'}
                        labelStyle={style?.label}
                        required
                        placeholder={'Enter doctor email'}
                        name={'email'}
                        control={control}
                        inputStyle={formStyles?.textInput}
                        keyboardType={'email-address'}
                        errorMessage={errors?.email?.message}
                    />
                    <CustomTextInput
                        label={'Doctor age'}
                        labelStyle={style?.label}
                        required
                        maxLength={2}
                        placeholder={'Enter doctor age'}
                        name={'doctor_age'}
                        control={control}
                        inputStyle={formStyles?.textInput}
                        keyboardType={'numeric'}
                        errorMessage={errors?.doctor_age?.message}
                    />
                    <SelectInput
                        label={'Gender'}
                        labelStyle={style?.label}
                        required
                        placeHolder={'Select Gender'}
                        name={'doctor_gender'}
                        control={control}
                        items={[
                            {
                                label: 'Male',
                                value: UserGender?.MALE,
                            },
                            {
                                label: 'Female',
                                value: UserGender?.FEMALE,
                            }]}
                        errorMessage={errors?.doctor_gender?.message}
                    />
                    <SelectInput
                        label={'Speciality'}
                        labelStyle={style?.label}
                        required
                        placeHolder={'Select Speciality'}
                        name={'speciality'}
                        control={control}
                        items={[
                            {
                                label: 'Cardiology',
                                value: DoctorSpecialists?.CARDIOLOGY,
                            },
                            {
                                label: 'Dermatology',
                                value: DoctorSpecialists?.DERMATOLOGY,
                            }]}
                        errorMessage={errors?.speciality?.message}
                    />
                    <CustomTextInput
                        required
                        label={'Mobile number'}
                        labelStyle={style?.label}
                        placeholder={'Enter mobile number'}
                        inputStyle={formStyles?.textInput}
                        keyboardType={'numeric'}
                        control={control}
                        name={'telphone'}
                        maxLength={10}
                        errorMessage={errors?.telphone?.message}
                    />
                    <View>
                        <Text style={style?.label}>
                            Work Time
                            <Text style={{ color: colors?.RED }}>*</Text>
                        </Text>
                        <View style={{ padding: 10, gap: 10 }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <CustomButton
                                    onPress={() => setInTimePicker(true)}
                                    textStyle={style?.buttonText}
                                    type={CustomButtonTypes.NORMALBUTTON} title={'In Time'}/>
                                <Text style={style?.content}>
                                    {watch('inTime') ? getTime(watch('inTime')) : '00:00'}
                                </Text>
                                {errors?.inTime?.message &&
                                    <ErrorMessage
                                        message={errors?.inTime?.message} />}
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                 <CustomButton
                                    onPress={() => setOutTimePicker(true)}
                                    textStyle={style?.buttonText}
                                    type={CustomButtonTypes.NORMALBUTTON} title={'Out Time'}/>
                                <Text style={style?.content}>
                                    {watch('outTime') ? getTime(watch('outTime')) : '00:00'}
                                </Text>
                                {errors?.outTime?.message &&
                                    <ErrorMessage
                                        message={errors?.outTime?.message} />}
                            </View>
                        </View>
                    </View>
                    <View style={style?.workDaysContainer}>
                        <View style={style?.headingContainer}>
                            <Text style={style?.label}>
                                Work days
                                <Text style={{ color: colors?.RED }}>*</Text>
                            </Text>
                        </View>
                        {
                            Object.keys(getValues('work_days')).map((day) => (
                                <Controller
                                    key={day}
                                    name={`work_days.${day as keyof WorkDays}`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomCheckbox
                                            text={day}
                                            iconSize={23}
                                            iconColor={PRIMARY_COLOR}
                                            textStyle={style?.content}
                                            isChecked={field?.value}
                                            onChange={field?.onChange} />
                                    )} />
                            ))
                        }
                        {errors?.work_days?.message &&
                            <ErrorMessage message={errors?.work_days?.message} />}
                    </View>
                    <CustomButton
                        type={CustomButtonTypes.OPASITYBUTTON}
                        title={'Submit'}
                        buttonStyle={formStyles?.button}
                        textStyle={formStyles?.buttonTextStyle}
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
                    buttonStyle={styles?.popupButton}
                    buttonTextStyle={styles?.popupButtonText} />
                <DateTimePicker
                    isVisible={inTimePicker}
                    mode={'time'}
                    onConfirm={(value) => {
                        setTimeValue('inTime', value);
                    }}
                    onCancel={() => setInTimePicker(false)} />
                <DateTimePicker
                    isVisible={outTimePicker}
                    mode={'time'}
                    onConfirm={(value) => {
                        setTimeValue('outTime', value);
                    }}
                    onCancel={() => setOutTimePicker(false)} />
            </View>
        </ScrollView >
    );
};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors?.WHITE,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        padding: 30,
        gap: 40,
    },
    workDaysContainer: {
        gap: 30,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    label: {
        fontFamily: fonts?.REGULAR,
        textTransform: 'capitalize',
    },
    content: {
        fontFamily: fonts?.LIGHT,
        textTransform: 'capitalize',
    },
    dayContainer: {
        paddingStart: 15,
        gap: 10,
    },
    smallDropDown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingHorizontal: 10,
        borderColor: colors?.GRAY,
        borderRadius: 5,
        borderWidth: 2,
    },
    buttonText: {
        ...styles?.buttonText,
        textDecorationLine: 'underline',
    },
});
