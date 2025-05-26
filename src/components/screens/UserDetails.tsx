import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from 'src/Assets/Fonts';
import { getUserImage } from 'src/Assets/Images';
import { styles } from 'src/Assets/Styles/global';
import { RootState } from 'src/Redux/store';
import { getTime } from 'src/Schema/MomentFunctions';
import { getWorkdaysFormat } from 'src/Schema/Workdays';
import { CustomButton, CustomButtonTypes } from '../Custom/CustomButton/CustomButton';
import { colors, PRIMARY_COLOR } from 'src/Assets/Enums/colors';
import { setBooking } from 'src/Redux/bookingSlice';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../Types/NavigationProp';
import { screens } from 'src/Assets/Enums/screens';
import { UserRole } from 'src/MockDatabase/Enums/users';

export const UserDetails = ({ route }) => {
    const user = useSelector((state: RootState)=> state?.user);
    const { user: selectedUser } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp>();
    const bookingState = useSelector((state: RootState) => state?.booking);
    if (!selectedUser) {
        return <Text>No User found</Text>;
    }
    return (
        <View style={style?.screen}>
            <View style={style?.container}>
                <View style={style?.imageContainer}>
                    <Image source={getUserImage(selectedUser?.user_role, selectedUser?.user_gender)} style={style?.image} />
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Name - </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {selectedUser?.user_name}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Email - </Text>
                    <Text style={style?.content}>
                        {selectedUser?.email}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Age - </Text>
                    <Text style={style?.content}>
                        {selectedUser?.user_age}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Gender - </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {selectedUser?.user_gender}
                    </Text>
                </View>
                <View style={style?.contentContainer}>
                    <Text style={style?.label}>Phone - </Text>
                    <Text style={style?.contentWithCapitalized}>
                        {selectedUser?.telphone}
                    </Text>
                </View>
                {
                    selectedUser &&
                    'speciality' in selectedUser &&
                    <View style={style?.contentContainer}>
                        <Text style={style?.label}>Speciality - </Text>
                        <Text style={style?.contentWithCapitalized}>
                            {selectedUser?.speciality}
                        </Text>
                    </View>
                }
                {
                    selectedUser &&
                    'work_days' in selectedUser &&
                    <View style={style?.contentContainer}>
                        <Text style={style?.label}>Work days - </Text>
                        <Text style={style?.contentWithCapitalized}>
                            {getWorkdaysFormat(selectedUser?.work_days)}
                        </Text>
                    </View>
                }
                {
                    selectedUser &&
                    'inTime' in selectedUser &&
                    'outTime' in selectedUser &&
                    selectedUser?.inTime &&
                    <View style={style?.contentContainer}>
                        <Text style={style?.label}>Work time - </Text>
                        <Text style={style?.content}>
                            {getTime(selectedUser?.inTime)} - {getTime(selectedUser?.outTime)}
                        </Text>
                    </View>
                }
            </View>
            {
                 user?.user_role === UserRole?.PATIENT &&
                <CustomButton
                    type={CustomButtonTypes.OPASITYBUTTON}
                    title={'Book Appointment'}
                    buttonStyle={style?.button}
                    textStyle={style?.buttonText}
                    onPress={()=> {
                        dispatch(setBooking({
                            doctor_name: selectedUser?.user_name,
                            doctor_id: selectedUser?.user_id,
                            doctor_speciality: selectedUser?.speciality,
                            doctor_in_time: selectedUser?.inTime,
                            doctor_out_time: selectedUser?.outTime,
                            doctor_work_days: selectedUser?.work_days,
                        }));
                        navigation?.navigate(screens?.BookAppointment);
                    }}
                />}
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        ...styles?.screen,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        gap: 10,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    contentContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    label: {
        ...styles?.capitalizedContent,
        fontFamily: fonts?.REGULAR,
    },
    content: {
        ...styles?.paragraph,
    },
    contentWithCapitalized: {
        ...styles?.capitalizedContent,
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
        ...styles?.buttonText,
        textAlign: 'center',
        color: colors?.WHITE,
    },
});
