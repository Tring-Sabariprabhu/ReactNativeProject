import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from 'src/Assets/Enums/colors';
import { allRoutes } from 'src/Routes/allRoutes';

export const PatientsStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: colors?.WHITE,
            },
        }}>
            <Stack.Screen name={allRoutes?.Patients?.name} component={allRoutes?.Patients?.component} />
            <Stack.Screen name={allRoutes?.UserDetails?.name} component={allRoutes?.UserDetails?.component} />
        </Stack.Navigator>
    );
};
