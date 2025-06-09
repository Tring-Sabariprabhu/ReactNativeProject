import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from 'src/Assets/Fonts';
import { RootState } from 'src/Redux/store';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'src/Assets/Enums/colors';
import { useEffect } from 'react';
import { getCurrentUser } from 'src/MockDatabase/MockAPIs/auth';
import { setUser } from 'src/Redux/userSlice';
import { privateRoutes } from 'src/Routes/privateRoutes';
import { DrawerContent } from 'src/Components/Custom/DrawerContent';
import { HomeScreen } from 'src/Components/Screens/HomeScreen';
import { screens } from 'src/Assets/Enums/screens';
import { ScreenProps } from 'src/Components/Types/screenProps';
import { style as drawerStyle } from 'src/Components/Custom/DrawerContent';
interface DrawerIconProps {
    color: string
    size: number
    iconName: string
    iconFamily: 'MaterialIcons' | 'FontAwesome'
}
const DrawerIcon = ({ color, size, iconName, iconFamily }: DrawerIconProps) => {
    switch (iconFamily) {
        case 'MaterialIcons':
            return <MaterialIcon name={iconName} color={color} size={size} />;
        case 'FontAwesome':
            return <FontAwesomeIcon name={iconName} color={color} size={size} />;
    }
};


export const DashBaordLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getCurrentUser().then((user) => {
            dispatch(setUser({
                user_id: user?.user_id,
                user_name: user?.user_name,
                user_role: user?.user_role,
                user_age: user?.user_age,
                user_gender: user?.user_gender,
                email: user?.email,
            }));
        });
    }, [dispatch]);
    const user = useSelector((state: RootState) => state?.user);
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={screens?.Home}
                drawerContent={(props) => <DrawerContent {...props} />}
                screenOptions={
                    {
                        drawerActiveBackgroundColor: colors?.WHITE,
                        drawerActiveTintColor: colors?.DARK_BLUE,
                        headerShadowVisible: false,
                        headerStyle: drawerStyle?.headerStyle,
                        headerTitleStyle: drawerStyle?.headerTitleStyle,
                        drawerLabelStyle: drawerStyle?.drawerLabelStyle,
                        drawerItemStyle: drawerStyle?.drawerItemStyle,
                    }}>
                <Drawer.Screen name={screens?.Home}
                    component={HomeScreen}
                    options={
                        {
                            title: 'Dashboard',
                            drawerIcon: (props) =>
                                <DrawerIcon {...props} iconName={'home'} iconFamily={'MaterialIcons'} />,
                        }
                    } />
                {
                    user?.user_role &&
                    privateRoutes[user?.user_role]?.map((screen: ScreenProps, index) => (
                        <Drawer.Screen name={screen?.name}
                            component={screen?.component}
                            key={index}
                            options={
                                {
                                    ...screen?.options,
                                    drawerIcon: (props) =>
                                        <DrawerIcon {...props} iconName={screen?.iconName} key={index} iconFamily={screen?.iconFamily} />,
                                }
                            } />
                    ))
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

