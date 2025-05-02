import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text } from 'react-native';
import { privateScreens } from 'src/assets/enums/screens';
import { fonts } from 'src/assets/fonts';
import { colors } from 'src/assets/styles/global';
import { privateRoutes } from 'src/routes/PrivateRoutes';

export const DashBaordLayout = () => {
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={privateScreens?.Home}
                screenOptions={
                    {
                        headerTitleStyle: {
                            fontFamily: fonts?.Medium,
                        },
                        drawerLabelStyle: {
                            fontFamily: fonts?.Medium,
                            fontSize: 20,
                        },
                        headerShadowVisible: true,
                        headerStyle: {
                            borderRadius: 20,
                        },
                        drawerItemStyle: {
                            borderRadius: 10,
                        },
                        drawerActiveBackgroundColor: colors?.color_gray,
                    }}>
                {privateRoutes?.map((screen, index)=> (
                        <Drawer.Screen name={screen?.name} component={screen?.component} options={screen?.options} key={index}/>
                    ))}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
