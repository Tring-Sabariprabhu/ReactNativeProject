import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { Controller, useForm } from 'react-hook-form';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { NavigationProp, SigninFormStyles } from '../Authentication/SigninScreen';
import { addDoctor } from 'src/MockDatabase/MockAPIs/users';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { toastLengthShort, toastStyle } from 'src/Assets/Styles/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inputPatterns } from 'src/Validation/inputPatterns';
import { inputTypes } from 'src/Assets/Enums/inputTypes';
import { Picker } from '@react-native-picker/picker';
import { ErrorMessage } from '../Custom/ErrorMessage';
import { Days, DoctorSpecialists, Slots, UserGender } from 'src/MockDatabase/Enums/users';
import { useEffect, useState } from 'react';
import { CustomPopup, CustomPopupTypes } from '../Custom/CustomPopup/CustomPopup';
import { styles } from 'src/Assets/Styles/global';
import { CustomCheckbox } from '../Custom/CustomCheckbox';
import { colors } from 'src/Assets/Enums/colors';
import { SlotTimings } from 'src/MockDatabase/Types/Types';
import { useNavigation } from '@react-navigation/native';
import { privateScreens } from 'src/Assets/Enums/screens';
import { fonts } from 'src/Assets/Fonts';
interface DaySlots {
    slot1: boolean
    slot2: boolean
}
interface WorkDays {
    monday: DaySlots;
    tuesday: DaySlots;
    wednesday: DaySlots;
    thursday: DaySlots;
    friday: DaySlots;
    saturday: DaySlots;
    sunday: DaySlots;
}
interface FormValues {
    doctor_name: string
    doctor_age: number
    doctor_gender: UserGender
    speciality: DoctorSpecialists
    email: string
    work_days: WorkDays
}

const DaySchema = yup
    .object()
    .shape({
        slot1: yup.boolean().required(),
        slot2: yup.boolean().required(),
    }).required();
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
            monday: DaySchema,
            tuesday: DaySchema,
            wednesday: DaySchema,
            thursday: DaySchema,
            friday: DaySchema,
            saturday: DaySchema,
            sunday: DaySchema,
        }).required(),
        email: yup.string()
            .trim()
            .required('Email is required')
            .matches(inputPatterns({ type: inputTypes?.EMAIL }), 'Email should be valid'),
    });
export const AddDoctorScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [confirmPopup, setConfirmPopup] = useState(false);

    const defaultDay = {
        slot1: false,
        slot2: false,
    };
    const defaultValues = {
        doctor_name: '',
        doctor_age: 0,
        doctor_gender: UserGender?.MALE,
        speciality: DoctorSpecialists?.CARDIOLOGY,
        email: '',
        work_days: {
            monday: defaultDay,
            tuesday: defaultDay,
            wednesday: defaultDay,
            thursday: defaultDay,
            friday: defaultDay,
            saturday: defaultDay,
            sunday: defaultDay,
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
                } = doctor;
                const slotTimings: SlotTimings[] = [];
                const work_days: Days[] = [];

                for (const dayKey in doctor?.work_days) {
                    const daySlots = Object.entries(doctor?.work_days[dayKey as keyof WorkDays]);
                    let atleastOneSlotSelected = false;
                    for (const [key, value] of daySlots) {
                        if (value) {
                            atleastOneSlotSelected = true;
                            slotTimings.push({
                                day: Days[dayKey as keyof WorkDays],
                                slot: Slots[key as keyof DaySlots],
                                status: 'Available',
                            });
                        }
                    }
                    if (atleastOneSlotSelected) {
                        work_days.push(Days[dayKey as keyof WorkDays]);
                    }
                }
                const result = addDoctor(
                    {
                        email: email?.trim()?.toLowerCase(),
                        doctor_name: doctor_name?.trim(),
                        doctor_age,
                        doctor_gender,
                        speciality,
                        work_days,
                        slotTimings,
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

    const onSubmit = () => {
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
                            style={styles?.dropDown}
                            selectionColor={colors?.BLUE}
                            selectedValue={getValues('doctor_gender')}
                            mode={'dropdown'}
                            onValueChange={(value) => {
                                setValue('doctor_gender', value);
                            }}>
                            <Picker.Item label={'Male'}
                                value={UserGender?.MALE}
                                style={styles?.dropDownItem} />
                            <Picker.Item label={'Female'}
                                value={UserGender?.FEMALE}
                                style={styles?.dropDownItem} />
                        </Picker>
                        {errors?.doctor_gender?.message && <ErrorMessage message={errors?.doctor_gender?.message} />}
                    </View>
                    <View>
                        <Picker
                            style={styles?.dropDown}
                            selectedValue={getValues('speciality')}
                            mode={'dropdown'}
                            onValueChange={(value) => {
                                setValue('speciality', value);
                            }}>
                            <Picker.Item label={'Cardiology'}
                                value={DoctorSpecialists?.CARDIOLOGY}
                                style={styles?.dropDownItem} />
                            <Picker.Item label={'Dermatology'}
                                value={DoctorSpecialists?.DERMATOLOGY}
                                style={styles?.dropDownItem} />
                        </Picker>
                        {errors?.speciality?.message && <ErrorMessage message={errors?.speciality?.message} />}
                    </View>
                    <View style={style?.workDaysContainer}>
                        {
                            Object.keys(getValues('work_days')).map((day) => (
                                <View key={day} style={{ gap: 10 }} >
                                    <View >
                                        <Text style={style?.label}>{day}</Text>
                                    </View>
                                    <View style={{ gap: 15 }}>
                                        {
                                            Object.keys(getValues(`work_days.${day as keyof WorkDays}`)).map((slot, index) => (
                                                <View key={index}>
                                                    <Controller
                                                        name={`work_days.${day as keyof WorkDays}.${slot as keyof DaySlots}`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <CustomCheckbox
                                                                text={Slots[slot as keyof DaySlots]}
                                                                isChecked={field?.value}
                                                                onChange={field?.onChange}
                                                                textStyle={style?.content}
                                                                iconSize={25}
                                                                iconColor={colors?.DARK_BLUE} />
                                                        )} />
                                                </View>
                                            ))
                                        }
                                    </View>
                                </View>
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
                    buttonStyle={styles?.popupButton}
                    buttonTextStyle={styles?.popupButtonText} />
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
        paddingHorizontal: 10,
        gap: 40,
    },
    workDaysContainer: {
        gap: 30,
    },
    label: {
        fontFamily: fonts?.REGULAR,
        fontSize: 18,
        textTransform: 'capitalize',
    },
    content: {
        fontSize: 17,
        fontFamily: fonts?.LIGHT,
        textTransform: 'capitalize',
    },
});
