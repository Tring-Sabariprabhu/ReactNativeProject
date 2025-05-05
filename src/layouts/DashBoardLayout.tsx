import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { privateScreens } from 'src/Assets/Enums/screens';
import { fonts } from 'src/Assets/Fonts';
import { colors } from 'src/Assets/Styles/global';
import { RootState } from 'src/Redux/store';
import { privateRoutes } from 'src/Routes/privateRoutes';


export const DashBaordLayout = () => {
    const user = useSelector((state: RootState)=> state?.user);
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={privateScreens?.Home}
                screenOptions={
                    {
                        headerTitleStyle: {
                            fontFamily: fonts?.MEDIUM,
                        },
                        drawerLabelStyle: {
                            fontFamily: fonts?.MEDIUM,
                            fontSize: 20,
                        },
                        headerShadowVisible: false,
                        headerStyle: {
                          borderBottomWidth: 1,
                        },
                        drawerItemStyle: {
                            borderRadius: 10,
                        },
                        drawerActiveBackgroundColor: colors?.GRAY,
                    }}>
                {privateRoutes?.map((screen, index)=> {
                    if(user?.user_role && screen?.roles?.includes(user?.user_role)){
                        return <Drawer.Screen name={screen?.name} component={screen?.component} key={index} options={screen?.options}/>;
                    }
                })}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
