import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { allRoutes } from 'src/Routes/allRoutes';

export const BookAppointmentStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={allRoutes?.SelectDoctor?.name}>
            <Stack.Screen name={allRoutes?.SelectDoctor?.name} component={allRoutes?.SelectDoctor?.component} />
        </Stack.Navigator>
    );
};
