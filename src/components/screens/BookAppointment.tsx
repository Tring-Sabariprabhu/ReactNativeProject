import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from 'src/Assets/Styles/global';
import { RootState } from 'src/Redux/store';
import { CustomTextInput } from '../Custom/CustomTextInput';
import { getWorkdaysFormat } from 'src/Schema/Workdays';
import { getTime } from 'src/Schema/MomentFunctions';
import LottieView from 'lottie-react-native';
import { fontSizes } from 'src/Assets/Styles/fontSizes';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { colors } from 'src/Assets/Enums/colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../Custom/ErrorMessage';

interface FormValues {
    doctor_id: string;
    patient_id: string;
    disease: string;
    description: string;
    time: Date;
    date: Date;
}
export const BookAppointment = () => {
    const user = useSelector((state: RootState) => state?.user);
    const booking = useSelector((state: RootState) => state?.booking);
    const [dateTimePicking, setDateTimePicking] = useState(false);
    const { control, setValue, formState: { errors }, handleSubmit, watch} = useForm<FormValues>();
    useEffect(() => {
        setValue('doctor_id', booking?.doctor_id);
        if (user?.user_id) {
            setValue('patient_id', user?.user_id);
        }
    }, [booking]);
    const onSubmit = (formvalues: FormValues) => {
        console.log(formvalues);
    };
    return (
        <ScrollView>
            <View style={style?.screen}>
                <View style={style?.imageView}>
                    <LottieView
                        source={require('src/Assets/AnimationFiles/patientInformation.json')}
                        autoPlay
                        style={style?.animatedImage} />
                </View>
                <View style={style?.detailsRow}>
                    <Text style={styles?.label}>Doctor : </Text>
                    <Text style={style?.capitailizedContent}>
                        {booking?.doctor_name}
                    </Text>
                </View>
                <View style={style?.detailsRow}>
                    <Text style={styles?.label}>Speciality : </Text>
                    <Text style={style?.capitailizedContent}>
                        {booking?.doctor_speciality}
                    </Text>
                </View>
                <View style={style?.detailsRow}>
                    <Text style={styles?.label}>Work days : </Text>
                    <Text style={style?.capitailizedContent}>
                        {getWorkdaysFormat(booking?.doctor_work_days)}
                    </Text>
                </View>
                {
                    booking?.doctor_in_time && booking?.doctor_out_time &&
                    <View style={style?.detailsRow}>
                        <Text style={styles?.label}>Working time : </Text>
                        <Text style={style?.capitailizedContent}>
                            {getTime(booking?.doctor_in_time) + ' - ' + getTime(booking?.doctor_out_time)}
                        </Text>
                    </View>
                }
                {/* <CustomTextInput
                    label={'Patient name'}
                    labelStyle={styles?.label}
                    required
                    inputStyle={style?.textInput}
                    placeholder={'Patient name'}
                    keyboardType={'default'} />
                <CustomTextInput
                    label={'Patient age'}
                    labelStyle={styles?.label}
                    required
                    inputStyle={style?.textInput}
                    placeholder={'Patient age'}
                    keyboardType={'numeric'} /> */}
                <CustomTextInput
                    required
                    control={control}
                    name={'disease'}
                    label={'Disease'}
                    labelStyle={styles?.label}
                    inputStyle={style?.textInput}
                    placeholder={'Disease'}
                    keyboardType={'numeric'}
                    errorMessage={errors?.disease?.message} />
                <CustomTextInput
                    required
                    control={control}
                    name={'description'}
                    label={'Description'}
                    labelStyle={styles?.label}
                    inputStyle={style?.textInput}
                    placeholder={'Description about disease'}
                    keyboardType={'numeric'}
                    errorMessage={errors?.disease?.message} />
                <View>
                    <Text style={styles?.label}>
                        Date
                        <Text style={{ color: colors?.RED }}>*</Text>
                    </Text>
                    <Text>{watch('date')?.toString()}</Text>
                    {errors?.date?.message && <ErrorMessage message={errors?.date?.message} />}
                </View>
                <Controller
                    name={'date'}
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            isVisible={dateTimePicking}
                            mode={'datetime'}
                            onConfirm={field?.onChange}
                            onCancel={() => setDateTimePicking(false)} />
                    )}
                />
                <View>
                    <CustomButton
                        type={CustomButtonTypes?.OPASITYBUTTON}
                        title={'Submit'}
                        buttonStyle={style?.button}
                        textStyle={style?.buttonText}
                        onPress={() => handleSubmit(onSubmit)} />
                </View>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    imageView: {
        alignItems: 'center',
    },
    animatedImage: {
        width: 300,
        height: 300,
    },
    detailsRow: {
        flexDirection: 'row',
        gap: 5,
    },
    capitailizedContent: {
        ...styles?.paragraph,
        textTransform: 'capitalize',
        paddingStart: 5,
        fontSize: fontSizes?.content,
    },
    buttonView: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors?.DARK_BLUE,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        ...styles?.buttonText,
        textAlign: 'center',
        color: colors?.WHITE,
        fontSize: fontSizes?.heading,
    },
    textInput: {
        ...styles?.textInput,
        paddingHorizontal: 10,
    },
});
