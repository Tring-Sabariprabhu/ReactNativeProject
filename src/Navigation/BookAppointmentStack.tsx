import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from 'src/Assets/Enums/colors';
import { NavigationProp } from 'src/Components/Types/NavigationProp';
import { setBooking } from 'src/Redux/bookingSlice';
import { allRoutes } from 'src/Routes/allRoutes';

export const BookAppointmentStack = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch();
    useEffect(()=> {
        navigation?.addListener('focus', ()=> {
            dispatch(setBooking({
                booking: true,
            }));
        });
        navigation?.addListener('blur', ()=> {
            dispatch(setBooking({
                booking: false,
            }));
        });
    }, [navigation]);

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors?.WHITE,
                    },
                }}>
            <Stack.Screen name={allRoutes?.DoctorsStack?.name} component={allRoutes?.DoctorsStack?.component}/>
            <Stack.Screen name={allRoutes?.BookAppointment?.name} component={allRoutes?.BookAppointment?.component}/>
        </Stack.Navigator>
    );
};
