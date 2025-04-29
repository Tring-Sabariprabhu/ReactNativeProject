import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { screens } from '../assets/enums/screens';
import { HomeScreen } from '../components/screens/HomeScreen';
import { fonts } from 'src/assets/fonts';

export const DashBaordLayout = () => {
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={screens?.Home}
                screenOptions={
                    {
                        headerTitleStyle: {
                            fontFamily: fonts?.Medium,
                        },
                        drawerLabelStyle: {
                            fontFamily: fonts?.Medium,
                            fontSize: 20,
                        },
                        }}>
                <Drawer.Screen name={screens?.Home} component={HomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
