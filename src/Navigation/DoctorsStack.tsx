import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from 'src/Assets/Enums/colors';
import { allRoutes } from 'src/Routes/allRoutes';

export const DoctorsStack = ()=> {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: colors?.WHITE,
            },
        }}>
            <Stack.Screen name={allRoutes?.Doctors?.name} component={allRoutes?.Doctors?.component}/>
            <Stack.Screen name={allRoutes?.UserDetails?.name} component={allRoutes?.UserDetails?.component}/>
        </Stack.Navigator>
    );
};
